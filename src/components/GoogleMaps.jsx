import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Box } from '@mui/material';

const GoogleMaps = () => {
  const [userLocation, setUserLocation] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAKmP_5wDtUG3gM479BwLoqp9URpz4Wktw',
    libraries: ['places']
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
    });
  }, []);


  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      {!isLoaded && <div>Loading...</div>}
      {isLoaded && userLocation && (
        <GoogleMap
          mapContainerClassName='map-container'
          center={ userLocation }
          zoom={15}
        >
          <Marker position={userLocation} />
        </GoogleMap>
      )}
    </Box>
  );
};

export default GoogleMaps;

