import useUserLocation from "./hookUserLocation";
import { useState, useEffect } from "react";

const GeocodeUser = () => {
  const [userAddress, setUserAddress] = useState(null);
  const userLocation = useUserLocation();

  useEffect(() => {
    if (!userLocation) return; 

    const loadGoogleMapsAPI = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAKmP_5wDtUG3gM479BwLoqp9URpz4Wktw&libraries=places`;
      script.onload = () => {
        geocodeUserLocation();
      };
      document.head.appendChild(script);
    };

    const geocodeUserLocation = () => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: userLocation.lat, lng: userLocation.lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          setUserAddress(results[0].formatted_address);
        } else {
          console.error("Error al obtener la dirección del usuario:", status);
        }
      });
    };

    if (!window.google || !window.google.maps) {
  
      loadGoogleMapsAPI();
    } else {
   
      geocodeUserLocation();
    }
  }, [userLocation]);

  return userAddress;
};

export default GeocodeUser;
