export interface Camp {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  imageUrl?: string;
  features?: string[];
}

export const allFeatures: string[] = [
  'Water',
  "Restroom",
  "Fire Pit",
  "Shade",
  "Trash Bin",
  "Shower",
  "Electricity",
  "Parking"
]

export const camps: Camp[] = [
  {
    id: 1,
    name: "Alborz Mountain Camp",
    lat: 35.8955,
    lng: 51.7066,
    description: "A beautiful camp nestled in the Alborz Mountains with views of Mount Damavand.",
    imageUrl: "/images/Alborz Mountain Camp.jpeg",
    features: ["Water", "Restroom", "Fire Pit", "Shade"]
  },
  {
    id: 2,
    name: "Gilan Forest Camp",
    lat: 37.0808,
    lng: 49.5832,
    description: "A cozy retreat deep in the misty forests of northern Iran.",
    imageUrl: "/images/Gilan Forest Camp.jpg",
    features: ["Water", "Trash Bin", "Shower", "Electricity"]
  },
  {
    id: 3,
    name: "Maranjab Desert Camp",
    lat: 34.5792,
    lng: 51.4611,
    description: "Endless desert silence under a sky full of stars. Perfect for peace-seekers.",
    imageUrl: "/images/Maranjab Desert Camp.webp",
    features: ["Shade", "Water", "Restroom"]
  },
  {
    id: 4,
    name: "Chabahar Beach Camp",
    lat: 25.2919,
    lng: 60.6430,
    description: "Golden sands and ocean breeze along the Gulf of Oman coastline.",
    imageUrl: "/images/Chabahar Beach Camp.jpg",
    features: ["Electricity", "Shade", "Restroom", "Shower"]
  },
  {
    id: 5,
    name: "Upside-down Tulip Field Camp",
    lat: 32.3700,
    lng: 50.8640,
    description: "Colorful spring fields full of unique tulips, ideal for nature lovers.",
    imageUrl: "/images/Upside-down Tulip Field Camp.webp",
    features: ["Water", "Shower", "Parking"]
  },
  {
    id: 6,
    name: "Kurdistan Mountain Camp",
    lat: 35.3097,
    lng: 46.9989,
    description: "Green valleys and cool air in the western mountains of Iran.",
    imageUrl: "/images/Kurdistan Mountain Camp.jpg",
    features: ["Electricity", "Restroom", "Fire Pit"]
  },
  {
    id: 7,
    name: "Caspian Sea Camp",
    lat: 36.8500,
    lng: 54.4333,
    description: "A breezy beachside site along the Caspian Sea, ideal for summer camping.",
    imageUrl: "/images/Caspian Sea Camp.jpg",
    features: ["Water", "Electricity", "Restroom", "Shade"]
  },
  {
    id: 8,
    name: "Zagros Highland Camp",
    lat: 33.3558,
    lng: 49.2185,
    description: "Camp high in the Zagros Mountains with stunning sunset views.",
    imageUrl: "/images/Zagros Highland Camp.jpg",
    features: ["Fire Pit", "Water", "Parking"]
  },
  {
    id: 9,
    name: "Lake Urmia Camp",
    lat: 37.5333,
    lng: 45.0000,
    description: "Quiet and unique camping by the colorful shores of Lake Urmia.",
    imageUrl: "/images/Lake Urmia Camp.jpg",
    features: ["Water", "Shade", "Trash Bin"]
  },
  {
    id: 10,
    name: "Kavir National Park Camp",
    lat: 34.7200,
    lng: 52.9500,
    description: "Wild desert camping in Iran’s protected Kavir National Park region.",
    imageUrl: "/images/Kavir National Park Camp.jpg",
    features: ["Shade", "Restroom", "Fire Pit"]
  },
  {
    id: 11,
    name: "Lorestan River Camp",
    lat: 33.4894,
    lng: 48.3532,
    description: "Camp by the river with beautiful rocky formations and waterfalls.",
    imageUrl: "/images/Lorestan River Camp.jpg",
    features: ["Water", "Electricity", "Shower", "Restroom"]
  },
  {
    id: 12,
    name: "Sistan Lakefront Camp",
    lat: 30.6492,
    lng: 61.8471,
    description: "Peaceful lakeside camping in the Sistan Basin with birdwatching opportunities.",
    imageUrl: "/images/Sistan Lakefront Camp.jpg",
    features: ["Water", "Restroom", "Shower", "Trash Bin"]
  }
];