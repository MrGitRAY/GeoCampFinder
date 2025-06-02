import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type Props = {
  lat: number;
  lng: number;
};

const CampMiniMap = ({ lat, lng }: Props) => {
  const containerStyle = {
    width: "100%",
    height: "250px",
  };

  const center = {
    lat,
    lng,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDh31mnStTdhubMi0HZ4QVUIHlQQHrNZGg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={{ disableDefaultUI: true }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default CampMiniMap;