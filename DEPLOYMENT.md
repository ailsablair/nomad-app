# How to Launch Your App Publicly (FTP Guide)

To launch this app on your domain via FTP, you **cannot** simply upload all the files in this project. You must first create a "Production Build".

## Step 1: Create the Build
On your local computer (after downloading the repo):
1. Open your terminal in the project folder.
2. Run the following command:
   ```bash
   npm install
   npm run build
   ```
3. This will create a new folder named `dist` in your project directory.

## Step 2: Upload via FTP
1. Connect to your server using your FTP client (like FileZilla).
2. Open the **`dist`** folder on your computer.
3. Upload **everything inside the `dist` folder** (not the folder itself) to your web server (usually the `public_html` or `www` folder).

## Step 3: Important Note on Search Features
This app uses a backend server (`server.ts`) for the "AI Search" functionality. 
- **Standard Shared Hosting (FTP only)**: If your host only supports static files (HTML/JS), the main list of listings will work, but the **AI Search** feature will not function because it requires a Node.js environment to run the Gemini API safely.
- **Node.js Hosting**: If your host supports Node.js (like Heroku, Render, or specific VPS/Shared plans), you should upload the entire project and run `npm start` instead of just uploading the static files.

## Summary of Folders
- **`src/`**: Your development code (Don't upload this).
- **`dist/`**: Your production-ready website (Upload ONLY the contents of this).
