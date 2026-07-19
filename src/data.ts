import { Listing, RentalWebsite } from './types';

export const UNCONVENTIONAL_LISTINGS: Listing[] = [
  {
    id: 'lst_1',
    title: 'The Float-Away Floating Houseboat',
    description: 'An off-grid beautifully restored cedar wood houseboat docked in a peaceful, remote inlet. Complete with a wood-burning stove, rooftop deck, solar power, and direct canoe access. Perfect for an immersive monthly getaway on the water.',
    type: 'house_boat',
    location: 'Harrison River Inlet, BC (Remote)',
    price: 1250,
    availableDate: '2026-08-01',
    bedrooms: 1,
    bathrooms: 1,
    bathroomType: 'indoor',
    petFriendly: true,
    photoUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://www.hipcamp.com',
    sourceName: 'Hipcamp',
    country: 'CA'
  },
  {
    id: 'lst_2',
    title: 'High-Sierra Fire Lookout Tower',
    description: 'A decommissioned 1930s forestry fire lookout tower perched high above the tree line. Panoramic mountain views, manual pulley system for luggage, outdoor pit toilet, and absolute solitude. Accessible via a 3-mile hike.',
    type: 'fire_watch_tower',
    location: 'Mount Spokane Outskirts, WA (Remote)',
    price: 980,
    availableDate: '2026-09-15',
    bedrooms: 1,
    bathrooms: 1,
    bathroomType: 'outdoor',
    petFriendly: false,
    photoUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://www.caretaker.org',
    sourceName: 'Caretaker Gazette',
    country: 'US'
  },
  {
    id: 'lst_3',
    title: 'Coastal Headlands Lighthouse Keeper Suite',
    description: 'Live like a 19th-century lighthouse keeper. The historic assistant keeper quarters offer robust stone walls, dramatic ocean views, indoor bathroom, and outdoor auxiliary composting toilet. High post-to-respondent benefit.',
    type: 'lighthouse',
    location: 'Cape Blanco Coastline, OR (Rural)',
    price: 1400,
    availableDate: '2026-08-10',
    bedrooms: 2,
    bathrooms: 1.5,
    bathroomType: 'both',
    petFriendly: true,
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://sabbaticalhomes.com',
    sourceName: 'SabbaticalHomes',
    country: 'US'
  },
  {
    id: 'lst_4',
    title: 'A-Frame Cedar Forest Cabin',
    description: 'Charming moss-covered A-frame nestled deep in old-growth evergreens. Features an outdoor cedar soaking tub (wood-fired), fully equipped indoor kitchen, high-speed Starlink internet, and a pet-friendly fenced garden.',
    type: 'cabin',
    location: 'Snoqualmie Valley, WA (Rural)',
    price: 1600,
    availableDate: '2026-08-05',
    bedrooms: 1,
    bathrooms: 1,
    bathroomType: 'both',
    petFriendly: true,
    photoUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://www.glampinghub.com',
    sourceName: 'GlampingHub',
    country: 'US'
  },
  {
    id: 'lst_5',
    title: 'Wilderness Meadows Tiny House on Wheels',
    description: 'An architectural marvel on wheels parked in a 40-acre organic hay meadow. Minimalist birch interiors, custom composting toilet, outdoor clawfoot bathtub, solar array, and farm-fresh egg supply included in rent.',
    type: 'tiny_home',
    location: 'Grand Forks Rural Area, BC (Remote)',
    price: 850,
    availableDate: '2026-10-01',
    bedrooms: 1,
    bathrooms: 1,
    bathroomType: 'outdoor',
    petFriendly: true,
    photoUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://tinyhouselistings.com',
    sourceName: 'Tiny House Listings',
    country: 'CA'
  },
  {
    id: 'lst_6',
    title: 'Vintage Airstream Trailer on Ranch',
    description: 'Lovingly restored 1974 vintage land yacht retrofitted with modern heating, gas stove, and outdoor shower. Set alongside a running creek on a working equestrian ranch. Pet friendly with wide open trails.',
    type: 'trailer',
    location: 'Nicola Valley Country, BC (Rural)',
    price: 1100,
    availableDate: '2026-08-20',
    bedrooms: 1,
    bathrooms: 1,
    bathroomType: 'both',
    petFriendly: true,
    photoUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://rvshare.com',
    sourceName: 'RVshare',
    country: 'CA'
  },
  {
    id: 'lst_7',
    title: 'Slocan River Floating Ark',
    description: 'Unique solar-powered floating geodesic dome houseboat securely anchored on the calm bends of the Slocan River. Features compost facilities, indoor marine pump head, wood stove, and absolute silence from city noises.',
    type: 'house_boat',
    location: 'Slocan Valley, BC (Remote)',
    price: 1350,
    availableDate: '2026-09-01',
    bedrooms: 2,
    bathrooms: 1,
    bathroomType: 'indoor',
    petFriendly: false,
    photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://www.hipcamp.com',
    sourceName: 'Hipcamp',
    country: 'CA'
  },
  {
    id: 'lst_8',
    title: 'Redwood Valley Treehouse Cabin',
    description: 'Spanned between three ancient redwood trunks 15 feet off the forest floor. Built completely from reclaimed materials. Features a suspension bridge entrance, outdoor rain shower, and a cozy lofted bedding space.',
    type: 'cabin',
    location: 'Curry County Outskirts, OR (Remote)',
    price: 1550,
    availableDate: '2026-08-15',
    bedrooms: 1,
    bathrooms: 1,
    bathroomType: 'outdoor',
    petFriendly: true,
    photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    sourceUrl: 'https://www.canopyandstars.co.uk',
    sourceName: 'Canopy & Stars',
    country: 'US'
  }
];

export const CORE_WEBSITES: RentalWebsite[] = [
  {
    id: 'core_1',
    name: 'Hipcamp Cabins & Glamping',
    url: 'https://www.hipcamp.com',
    description: 'The definitive platform for rural, off-grid rentals. Lists thousands of unique structures like cabins, vintage trailers, canvas tents, and treehouses parked on private farm acreage or forests.',
    type: 'core',
    avgTerm: '1 week - 3 months',
    focus: 'Cabins, Trailers, Off-grid Yurts',
    competition: 'Medium'
  },
  {
    id: 'core_2',
    name: 'Tiny House Listings',
    url: 'https://tinyhouselistings.com',
    description: 'Specifically targets tiny houses on wheels or foundations. Many listings include rural land placements where owners rent out their tiny homes long-term or monthly for cost efficiency.',
    type: 'core',
    avgTerm: '1 month - 1 year',
    focus: 'Tiny Houses, Micro-cottages',
    competition: 'Low'
  },
  {
    id: 'core_3',
    name: 'Glamping Hub Unconventional',
    url: 'https://www.glampinghub.com',
    description: 'Curated outdoor accommodation directory specializing in architectural oddities: fire lookouts, lighthouses, luxury domes, houseboats, and modern forest cabins in rural nature.',
    type: 'core',
    avgTerm: '1 week - 6 months',
    focus: 'Lighthouses, Geodesic Domes, Barns',
    competition: 'Medium'
  },
  {
    id: 'core_4',
    name: 'The Caretaker Gazette',
    url: 'https://www.caretaker.org',
    description: 'An obscure newsletter active since 1983 listing direct caretaking opportunities. Rent-free or ultra-low rent in exchange for property maintenance of remote cabins, forest reserves, and lighthouses.',
    type: 'core',
    avgTerm: '3 months - 1 year',
    focus: 'Lighthouses, Wilderness Cabins, Ranches',
    competition: 'Low'
  },
  {
    id: 'core_5',
    name: 'SabbaticalHomes',
    url: 'https://www.sabbaticalhomes.com',
    description: 'Dedicated to academics, writers, and remote workers looking for quiet, intellectual monthly retreats. Features high-quality homes and cabins in extremely peaceful, rural, or collegiate areas with direct owner contracts.',
    type: 'core',
    avgTerm: '1 month - 1 year',
    focus: 'Country Estates, Mountain Cottages',
    competition: 'Low'
  },
  {
    id: 'core_6',
    name: 'Canopy & Stars',
    url: 'https://www.canopyandstars.co.uk',
    description: 'An independent travel platform highlighting highly creative nature-stuck accommodations: cabins, trailers, and hand-built spaces. Focuses on carbon-neutral off-grid designs in natural settings.',
    type: 'core',
    avgTerm: '1 week - 3 months',
    focus: 'Treehouses, Custom Sheds, Shepherd Huts',
    competition: 'Medium'
  },
  {
    id: 'core_7',
    name: 'RVshare (Long Term Stationary)',
    url: 'https://rvshare.com',
    description: 'Direct peer-to-peer RV and trailer rental platform. Filter for long-term setups or message owners to have trailers placed stationary on chosen agricultural plots or rural acreage.',
    type: 'core',
    avgTerm: '2 weeks - 6 months',
    focus: 'Retro Airstreams, RVs, Travel Trailers',
    competition: 'Medium'
  },
  {
    id: 'core_8',
    name: 'Houseboats.com & Marine Associations',
    url: 'https://houseboats.com',
    description: 'Aggregates commercial and private houseboat lease programs. Many private houseboat owners offer stationary long-term mooring leases in rural bays, canals, and non-city lakes.',
    type: 'core',
    avgTerm: '1 month - 6 months',
    focus: 'Stationary Houseboats, River barges',
    competition: 'Low'
  }
];

export const OTHER_WEBSITES: RentalWebsite[] = [
  {
    id: 'oth_1',
    name: 'MindMyHouse',
    url: 'https://www.mindmyhouse.com',
    description: 'Highly applicant-friendly house sitting platform. Features massive listings for remote country homes, hobby farms, and rural cabins needing care. Excellent ratio of postings to active sitters.',
    type: 'other',
    avgTerm: '2 weeks - 6 months',
    focus: 'Rural Farms & Cottage Sitting',
    competition: 'Low'
  },
  {
    id: 'oth_2',
    name: 'HouseCarers',
    url: 'https://www.housecarers.com',
    description: 'Focuses deeply on agricultural acreage, ranches, and country home security. Landlords here actively prefer hands-on applicants capable of handling remote lifestyle setups.',
    type: 'other',
    avgTerm: '1 month - 1 year',
    focus: 'Acreage Houses, Hobby Ranches',
    competition: 'Low'
  },
  {
    id: 'oth_3',
    name: 'TrustedHousesitters (Rural)',
    url: 'https://www.trustedhousesitters.com',
    description: 'Connects pet-loving house sitters with pet owners. Huge selection of remote forest cabins and lakeside cabins outside urban cores where owners travel for long periods.',
    type: 'other',
    avgTerm: '1 week - 3 months',
    focus: 'Pet-Friendly Rural Residences',
    competition: 'Medium'
  },
  {
    id: 'oth_4',
    name: 'Nomador Caretaking',
    url: 'https://www.nomador.com',
    description: 'Popular international house-sitting board with a strong emphasis on European-style countryside cottages, remote French/UK countryside barns, and off-grid chalets.',
    type: 'other',
    avgTerm: '2 weeks - 4 months',
    focus: 'Countryside Retreats, Mountain Chalets',
    competition: 'Low'
  },
  {
    id: 'oth_5',
    name: 'Workaway Remote Stays',
    url: 'https://www.workaway.info',
    description: 'Work exchange portal where users trade minimal hours (building, gardening, caretaking) for housing in yurts, earthships, tiny houses, or off-grid homesteads in remote settings.',
    type: 'other',
    avgTerm: '1 week - 6 months',
    focus: 'Earthships, Homestead Cabins, Yurts',
    competition: 'Low'
  },
  {
    id: 'oth_6',
    name: 'WWOOF Accommodation Exchange',
    url: 'https://wwoof.net',
    description: 'Worldwide opportunities on organic farms. Offers direct placement in unique farm trailers, bunkhouses, and eco-cabins in exchange for farm learning and community contribution.',
    type: 'other',
    avgTerm: '2 weeks - 6 months',
    focus: 'Eco-cabins, Farm Caravans',
    competition: 'Low'
  },
  {
    id: 'oth_7',
    name: 'Sublet.com Rural Portal',
    url: 'https://www.sublet.com',
    description: 'Direct landlord portal featuring short-term, month-to-month subletting agreements. High ratio of private country landlords bypass popular high-fee sites.',
    type: 'other',
    avgTerm: '1 month - 6 months',
    focus: 'Suburban Guest Suites, Detached Cottages',
    competition: 'Medium'
  },
  {
    id: 'oth_8',
    name: 'RentBoard Regional',
    url: 'https://www.rentboard.ca',
    description: 'Targeted Canadian housing board focusing extensively on smaller non-metro municipalities, agricultural towns, and coastal settlements. Low applicant volumes.',
    type: 'other',
    avgTerm: '3 months - 1 year',
    focus: 'Small Town Carriage Houses, Townhomes',
    competition: 'Low'
  },
  {
    id: 'oth_9',
    name: 'Homesteading Today Housing Forum',
    url: 'https://www.homesteadingtoday.com',
    description: 'Direct peer-to-peer classified board on a popular self-sufficiency forum. Homesteaders rent out spare guest cabins, vintage trailers, or tiny houses to like-minded seekers.',
    type: 'other',
    avgTerm: '1 month - 1 year',
    focus: 'Homestead Cabins, Farm Outbuildings',
    competition: 'Low'
  },
  {
    id: 'oth_10',
    name: 'Affordable Housing Online',
    url: 'https://affordablehousingonline.com',
    description: 'Aggregates non-urban, state-subsidized, or low-cost transitional leases. Perfect for searching affordable options in smaller, remote municipalities.',
    type: 'other',
    avgTerm: '6 months - 1 year',
    focus: 'Low-cost Regional Housing, Duplexes',
    competition: 'Low'
  },
  {
    id: 'oth_11',
    name: 'Selina Co-Living Nature',
    url: 'https://www.selina.com',
    description: 'A global co-living operator built for digital nomads, emphasizing locations directly in mountains, beaches, and jungles. Offers a monthly flexible Co-Live pass.',
    type: 'other',
    avgTerm: '1 month - 3 months',
    focus: 'Surf Lodges, Jungle Cabins',
    competition: 'Medium'
  },
  {
    id: 'oth_12',
    name: 'Outsite Cabin Network',
    url: 'https://www.outsite.co',
    description: 'High-end curated co-living with properties in rural forests, ski towns, and small beach settlements. Offers fully furnished workspaces and premium rural networking.',
    type: 'other',
    avgTerm: '2 weeks - 3 months',
    focus: 'Premium Wood Cabins, Mountain Lodges',
    competition: 'Medium'
  },
  {
    id: 'oth_13',
    name: 'RVshare Stationary (US/CA)',
    url: 'https://rvshare.com',
    description: 'P2P camper rentals that owners will pre-deliver and hook up at any rural campsite, farm, or acreage you arrange. Highly modular monthly pricing.',
    type: 'other',
    avgTerm: '1 month - 3 months',
    focus: 'Fully Furnished Camper trailers',
    competition: 'Medium'
  },
  {
    id: 'oth_14',
    name: 'Caretakers Worldwide',
    url: 'https://www.caretakersall.com',
    description: 'Specialized caretaker list where property owners list off-grid houses, small-town motels, and eco-retreats seeking winter caretakers or monthly managers.',
    type: 'other',
    avgTerm: '3 months - 1 year',
    focus: 'Eco-resorts, Wilderness Cabins',
    competition: 'Low'
  },
  {
    id: 'oth_15',
    name: 'Slocan & Kootenay Valley Craigslist',
    url: 'https://kootenay.craigslist.org',
    description: 'Craigslist sub-board specifically for the rural interior Kootenays in British Columbia. High count of vintage trailers, yurts, and wood cabins.',
    type: 'other',
    avgTerm: '1 month - 6 months',
    focus: 'Yurts, Log Cabins, Rural Rooms',
    competition: 'Low'
  },
  {
    id: 'oth_16',
    name: 'Olympic Peninsula Craigslist',
    url: 'https://olympic.craigslist.org',
    description: 'Classified portal for WA Olympic Peninsula. Features dozens of remote cabins, forest guest suites, and coastal trailers away from urban Seattle costs.',
    type: 'other',
    avgTerm: '1 month - 6 months',
    focus: 'Rainforest Cabins, Sea-side Cottages',
    competition: 'Low'
  },
  {
    id: 'oth_17',
    name: 'Vancouver Island Coastal Facebook Groups',
    url: 'https://www.facebook.com',
    description: 'Direct peer housing groups (e.g. "Sooke & Port Renfrew Rentals", "Comox Valley Sublets") where local homesteaders post unconventional rentals directly to avoid corporate fees.',
    type: 'other',
    avgTerm: '1 month - 6 months',
    focus: 'Carriage Houses, Oceanfront trailers',
    competition: 'Low'
  },
  {
    id: 'oth_18',
    name: 'Oregon Coastal Rentals Board',
    url: 'https://oregoncoast.craigslist.org',
    description: 'Coastal Oregon localized rental sub-board. Extremely active during shoulder seasons (Sept - May) with cheap monthly cabin and lighthouse-adjacent rentals.',
    type: 'other',
    avgTerm: '1 month - 6 months',
    focus: 'Coastal Cottages, Dune Trailers',
    competition: 'Low'
  },
  {
    id: 'oth_19',
    name: 'Roomies Rural Filter',
    url: 'https://www.roomies.com',
    description: 'Direct flatmate matching platform. Selecting smaller postal regions outside cities reveals cheap cottage sharing and remote farm rooms with friendly lease terms.',
    type: 'other',
    avgTerm: '1 month - 1 year',
    focus: 'Acreage flat sharing, Farmhouse wings',
    competition: 'Low'
  },
  {
    id: 'oth_20',
    name: 'Caretaker Gazette Classifieds',
    url: 'https://www.caretaker.org',
    description: 'Direct owner posts for agricultural sitting and coastal estate security. High acceptance ratios for applicants with handyman, gardening, or pet-care skills.',
    type: 'other',
    avgTerm: '2 months - 1 year',
    focus: 'Acreage Houses, Hobby Ranches',
    competition: 'Low'
  },
  {
    id: 'oth_21',
    name: 'Housesit Match Board',
    url: 'https://www.housesitmatch.com',
    description: 'Boutique house sitting service focusing heavily on rural properties and small hobby holdings. High degree of interaction between sitters and country homeowners.',
    type: 'other',
    avgTerm: '2 weeks - 3 months',
    focus: 'Country Houses, Village Cottages',
    competition: 'Low'
  },
  {
    id: 'oth_22',
    name: 'Nextdoor Country Portals',
    url: 'https://nextdoor.com',
    description: 'Localized suburban and rural neighbor boards. Posting a "Seeking Short Term Rental" flyer on Nextdoor in rural counties bypasses active listings entirely, sourcing direct off-market leads.',
    type: 'other',
    avgTerm: '1 month - 6 months',
    focus: 'Off-market Guest Cabins, Farm Lofts',
    competition: 'Very Low'
  },
  {
    id: 'oth_23',
    name: 'Guesthouses US direct',
    url: 'https://www.guesthouses.com',
    description: 'Consolidated network of private guesthouses, carriage homes, and rural estates looking for short-term monthly occupants to offset holding costs.',
    type: 'other',
    avgTerm: '1 month - 4 months',
    focus: 'Detached Carriage Houses, Barn Lofts',
    competition: 'Low'
  },
  {
    id: 'oth_24',
    name: 'Rural Home Rentals',
    url: 'https://www.ruralhomerentals.com',
    description: 'A specialized country housing directory focusing exclusively on farm rentals, wilderness cabins, and mountain lodges across North America.',
    type: 'other',
    avgTerm: '3 months - 1 year',
    focus: 'Cabins, Farmhouses, Barn Conversions',
    competition: 'Low'
  },
  {
    id: 'oth_25',
    name: 'LandlordDirect Remote Board',
    url: 'https://www.landlorddirect.com',
    description: 'Allows renters to deal directly with landlords, bypassing letting agents. Excellent for finding rural property landlords willing to negotiate short-term winter leases.',
    type: 'other',
    avgTerm: '3 months - 1 year',
    focus: 'Independent Rural Detached Cottages',
    competition: 'Low'
  }
];
