import { useEffect, useState } from 'react';

const useUserLocation = () => {
	const [userLocation, setUserLocation] = useState(null);

	useEffect(() => {
		const getUserLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					position => {
						const { latitude, longitude } = position.coords;
						setUserLocation({ lat: latitude, lng: longitude });
					},
					error => {
						console.error('Error getting user location:', error);
					},
				);
			} else {
				console.error('Geolocation is not supported by this browser.');
			}
		};

		getUserLocation();
	}, []);

	return userLocation;
};

export default useUserLocation;
