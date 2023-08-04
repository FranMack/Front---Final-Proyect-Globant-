import React, { useEffect, useState } from 'react';
import {
	GoogleMap,
	Marker,
	InfoWindow,
	useLoadScript,
} from '@react-google-maps/api';
import { Box } from '@mui/material';

const libraries = ['places'];

const includesGlobant = name => {
	return name.toLowerCase().includes('globant');
};

const GoogleMaps = () => {
	const [userLocation, setUserLocation] = useState(null);
	const [mcdonaldsNearby, setMcdonaldsNearby] = useState([]);
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyAKmP_5wDtUG3gM479BwLoqp9URpz4Wktw',
		libraries,
	});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			const { latitude, longitude } = position.coords;
			setUserLocation({ lat: latitude, lng: longitude });
		});
	}, []);

	useEffect(() => {
		if (isLoaded && userLocation) {
			const service = new window.google.maps.places.PlacesService(
				document.createElement('div'),
			);
			const request = {
				location: new window.google.maps.LatLng(
					userLocation.lat,
					userLocation.lng,
				),
				radius: 100000,
				keyword: 'Globant',
			};

			service.nearbySearch(request, (results, status) => {
				if (status === window.google.maps.places.PlacesServiceStatus.OK) {
					const globantPlaces = results.filter(place =>
						includesGlobant(place.name.toLowerCase()),
					);
					setMcdonaldsNearby(globantPlaces);
				}
			});
		}
	}, [isLoaded, userLocation]);

	const [selectedMarker, setSelectedMarker] = useState(null);

	if (loadError) {
		return <div>Error loading Google Maps</div>;
	}

	return (
		<Box sx={{ width: '100%' }}>
			<div style={{ padding: '20px' }}>
				{isLoaded && userLocation ? (
					<GoogleMap
						mapContainerClassName='map-container'
						center={userLocation}
						zoom={14}
					>
						<Marker position={userLocation} />
						{mcdonaldsNearby.map(place => (
							<Marker
								key={place.place_id}
								position={{
									lat: place.geometry.location.lat(),
									lng: place.geometry.location.lng(),
								}}
								onClick={() => setSelectedMarker(place)}
							/>
						))}
						{selectedMarker && (
							<InfoWindow
								position={{
									lat: selectedMarker.geometry.location.lat(),
									lng: selectedMarker.geometry.location.lng(),
								}}
								onCloseClick={() => setSelectedMarker(null)}
							>
								<div>
									<div>{selectedMarker.name}</div>
									<div>{selectedMarker.vicinity} </div>
								</div>
							</InfoWindow>
						)}
					</GoogleMap>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</Box>
	);
};

export default GoogleMaps;
