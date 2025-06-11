import { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { camps } from "../data/camps";
import type { Camp } from "../data/camps";

const userCamps = JSON.parse(localStorage.getItem("UserCamps") || "[]");
const allCamps = [...camps, ...userCamps];

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 33.6,
  lng: 53.6,
};

const Map = () => {
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);
  const navigate = useNavigate();

  return (
    <LoadScript googleMapsApiKey="AIzaSyDh31mnStTdhubMi0HZ4QVUIHlQQHrNZGg">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
        {allCamps.map((camp) => (
          <Marker
            key={camp.id}
            position={{ lat: camp.lat, lng: camp.lng }}
            onClick={() => {
              setSelectedCamp(camp);
            }}
          />
        ))}

        {selectedCamp && (
          <InfoWindow
            position={{ lat: selectedCamp.lat, lng: selectedCamp.lng }}
            onCloseClick={() => setSelectedCamp(null)}
          >
            <div className="max-w-xs text-gray-800 p-4 rounded shadow-md text-sm">
              <h3 className="text-lg font-bold mb-1">{selectedCamp.name}</h3>
              <p className="text-gray-600 mb-2">{selectedCamp.description}</p>
              <button
                onClick={() => navigate(`/home/camp-details/${selectedCamp.id}`)}
                className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-lime-700 transition"
              >
                Details
              </button>
            </div>
          </InfoWindow>

        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
