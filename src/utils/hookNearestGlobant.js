import { useEffect, useState } from 'react';
import useUserLocation from './hookUserLocation';
import { haversineDistance } from '../utils/calculus';

const useNearestGlobantDistance = () => {
	const userLocation = useUserLocation();
	const [nearestGlobantDistance, setNearestGlobantDistance] = useState(null);

	useEffect(() => {
		if (userLocation) {
			const map = new window.google.maps.Map(document.createElement('div'));

			const service = new window.google.maps.places.PlacesService(map);

			// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key
			const request = {
				location: new window.google.maps.LatLng(
					userLocation.lat,
					userLocation.lng,
				),
				radius: 10000, // 5 kilometers (adjust this radius as needed)
				keyword: 'Globant',
			};

			service.nearbySearch(request, (results, status) => {
				if (status === window.google.maps.places.PlacesServiceStatus.OK) {
					// Find the nearest Globant office
					let nearestDistance = Number.MAX_VALUE;
					results.forEach(place => {
						const distance = haversineDistance(
							userLocation.lat,
							userLocation.lng,
							place.geometry.location.lat(),
							place.geometry.location.lng(),
						);
						if (distance < nearestDistance) {
							nearestDistance = distance;
						}
					});

					setNearestGlobantDistance(nearestDistance);
				}
			});
		}
	}, [userLocation]);

	return nearestGlobantDistance;
};

export default useNearestGlobantDistance;
