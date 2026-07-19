import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please configure it in Settings > Secrets in the AI Studio UI.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Search Grounding & Maps Grounding endpoint
app.post("/api/search", async (req, res) => {
  try {
    const { query, tool = "search" } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Missing query string in request body." });
    }

    const ai = getGeminiClient();

    if (tool === "maps") {
      // Google Maps Grounding
      // Cannot set responseMimeType or responseSchema when using googleMaps
      const systemInstruction = 
        "You are an assistant finding unconventional short-term monthly rentals (cabins, tiny homes, houseboats, trailers, lookouts) outside major cities in Canada (prioritize Canadian options like BC, AB, ON, QC, etc., unless user specifically asks for US options). " +
        "Perform a thorough search on Google Maps for unique listings or rental companies in remote or rural regions. " +
        "Provide a helpful markdown description of what you find, including names, locations, general prices, and details. " +
        "Always highlight why these listings are advantageous for applicants looking for rural stays.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: query,
        config: {
          systemInstruction,
          tools: [{ googleMaps: {} }]
        }
      });

      // Extract URLs from grounding metadata
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks.map((chunk: any) => {
        if (chunk.maps?.uri) {
          return {
            title: chunk.maps.title || "Google Maps Location",
            url: chunk.maps.uri
          };
        } else if (chunk.web?.uri) {
          return {
            title: chunk.web.title || "Web Link",
            url: chunk.web.uri
          };
        }
        return null;
      }).filter(Boolean);

      return res.json({
        success: true,
        text: response.text || "No details found.",
        links,
        toolUsed: "googleMaps"
      });

    } else {
      // Google Search Grounding with structured JSON output schema
      const systemInstruction = 
        "You are an expert finder of unconventional monthly short-term rentals (cabins, tiny homes, houseboats, trailers, lookouts, lighthouses) in remote or rural locations. " +
        "Use Google Search to find real, active, or historical listings outside major cities. Prioritize Canadian options (British Columbia, Alberta, Ontario, Quebec, etc.) by default. " +
        "You can find United States listings only if the user specifically requests USA or American options. " +
        "Return a structured JSON list of at least 3-5 real listings you found. For each listing, estimate the price, specify its location, bedrooms, bathrooms, " +
        "whether it is pet friendly (boolean), type of accommodation, a nice description, the country ('CA' or 'US'), and provide a real outbound source name and link you found.";

      const responseSchema = {
        type: Type.ARRAY,
        description: "List of unconventional rentals found using Google Search",
        items: {
          type: Type.OBJECT,
          required: [
            "title",
            "description",
            "type",
            "location",
            "price",
            "bedrooms",
            "bathrooms",
            "bathroomType",
            "petFriendly",
            "sourceName",
            "sourceUrl",
            "country"
          ],
          properties: {
            title: { type: Type.STRING, description: "Name/title of the listing" },
            description: { type: Type.STRING, description: "Detailed description of the property" },
            type: { 
              type: Type.STRING, 
              description: "Must be one of: 'house_boat', 'cabin', 'tiny_home', 'fire_watch_tower', 'lighthouse', 'trailer', 'other'"
            },
            location: { type: Type.STRING, description: "Location name with state/province/country, e.g. Harrison River, BC" },
            price: { type: Type.NUMBER, description: "Estimated monthly rent in local currency" },
            bedrooms: { type: Type.NUMBER, description: "Number of bedrooms" },
            bathrooms: { type: Type.NUMBER, description: "Number of bathrooms" },
            bathroomType: { 
              type: Type.STRING, 
              description: "Must be one of: 'indoor', 'outdoor', 'both'"
            },
            petFriendly: { type: Type.BOOLEAN, description: "Whether pets are permitted" },
            sourceName: { type: Type.STRING, description: "Name of the website/source" },
            sourceUrl: { type: Type.STRING, description: "Real outbound URL to the original listing or site" },
            country: { type: Type.STRING, description: "Must be 'CA' or 'US'" }
          }
        }
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: query,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema
        }
      });

      const responseText = response.text || "[]";
      let listings = [];
      try {
        listings = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse JSON response from Gemini:", responseText);
        // Fallback: search for array-like structure if parsing directly failed
        const match = responseText.match(/\[[\s\S]*\]/);
        if (match) {
          listings = JSON.parse(match[0]);
        }
      }

      // Extract grounding links to display as sources
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks.map((chunk: any) => {
        if (chunk.web?.uri) {
          return {
            title: chunk.web.title || "Web Link",
            url: chunk.web.uri
          };
        }
        return null;
      }).filter(Boolean);

      return res.json({
        success: true,
        listings: listings.map((l: any, i: number) => ({
          ...l,
          id: `ai_${Date.now()}_${i}`,
          isAI: true,
          photoUrl: getRandomPhotoUrl(l.type)
        })),
        links,
        toolUsed: "googleSearch"
      });
    }

  } catch (error: any) {
    console.error("Gemini Search Endpoint Error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred during search. Please make sure GEMINI_API_KEY is configured in your secrets." 
    });
  }
});

// Helper to provide high quality fallback photo URLs depending on type
function getRandomPhotoUrl(type: string): string {
  const photos: Record<string, string[]> = {
    house_boat: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
    ],
    cabin: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
    ],
    tiny_home: [
      "https://images.unsplash.com/photo-1525113990974-3f45d87244bb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    fire_watch_tower: [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80"
    ],
    lighthouse: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    ],
    trailer: [
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?auto=format&fit=crop&w=800&q=80"
    ],
    other: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80"
    ]
  };

  const list = photos[type] || photos.other;
  return list[Math.floor(Math.random() * list.length)];
}

// Vite and Static serving setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
