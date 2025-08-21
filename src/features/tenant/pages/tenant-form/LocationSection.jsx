import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import L from "leaflet";
import TextField from "@mui/material/TextField";
// Fix for default marker icons in React-Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map click events
const MapClickHandler = ({ setMarkerPosition, setValue }) => {
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    
    setValue("location.lat", lat);
    setValue("location.lng", lng);

    setMarkerPosition([lat, lng]);
    
  });

  return null; // This component doesn't render anything
};

const LocationSection = ({ register, errors, setValue }) => {
  const [mapCenter, setMapCenter] = useState([44.82161305049556, 20.46657154085775]); // Default center
  const [markerPosition, setMarkerPosition] = useState(null); // Start with no marker

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold w-fit text-primary">Location</h2>
      <TextField
        {...register("location.address", {
          required: {
            value: true,
            message: "Address is required",
          },
        })}
        label="Address"
        type="text"
        variant="standard"
        fullWidth
        error={!!errors.location?.address}
        helperText={errors.location?.address?.message}
      />

      {/* Leaflet Map */}
      {/* <div className="h-96 w-full rounded">
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerPosition && (
            <Marker position={markerPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )}
          <MapClickHandler
            setMarkerPosition={setMarkerPosition}
            setValue={setValue}
          />
        </MapContainer>
      </div> */}
    </div>
  );
};

export default LocationSection;