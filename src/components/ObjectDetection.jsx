/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useRef, useEffect, useState } from 'react';
import '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

import technicalServiceImage from '../assets/technical-service-image.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ResponsiveAppBar from './Navbar';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ReportCamOn from './ReportCamOn';
import Loading from '../view/Loading';
import Pako from 'pako';

const ObjectDetection = () => {
	const Navigate = useNavigate();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [modelStart, setModelStart] = useState(false);
	const [capturedImage, setCapturedImage] = useState(null);
	const [objectInCamera, setObjectInCamera] = useState('');
	const [confirm, setConfirm] = useState(false);
	/////////////////////
	const [model, setModel] = useState(null);
	const [labelContainer, setLabelContainer] = useState(null);
	const [maxPredictions, setMaxPredictions] = useState(0);
	const imageInputRef = useRef(null);
	const labelContainerRef = useRef(null);

	const URL = 'https://teachablemachine.withgoogle.com/models/Fnqyc2KVZ/';
	useEffect(() => {
		const runObjectDetection = async () => {
			try {
				const modelURL = URL + 'model.json';
				const metadataURL = URL + 'metadata.json';

				const loadedModel = await tmImage.load(modelURL, metadataURL);
				setModel(loadedModel);
			} catch (error) {
				console.error('Error loading model:', error);
			}
			setModelStart(true);

			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				try {
					const stream = await navigator.mediaDevices.getUserMedia({
						video: { facingMode: 'environment' },
					});

					videoRef.current.srcObject = stream;
				} catch (error) {
					Navigate('/device-list');
				}
			}
		};

		runObjectDetection();
	}, [URL]);

	useEffect(() => {
		if (labelContainerRef.current) {
			setLabelContainer(labelContainerRef.current);
			for (let i = 0; i < maxPredictions; i++) {
				labelContainerRef.current.appendChild(document.createElement('div'));
			}
		}
	}, [maxPredictions]);

	const compressImage = async (imageDataUrl, maxWidth, maxHeight) => {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.src = imageDataUrl;

			image.onload = () => {
				const canvas = document.createElement('canvas');
				const context = canvas.getContext('2d');

				let width = image.width;
				let height = image.height;

				if (width > maxWidth) {
					height *= maxWidth / width;
					width = maxWidth;
				}

				if (height > maxHeight) {
					width *= maxHeight / height;
					height = maxHeight;
				}

				canvas.width = width;
				canvas.height = height;

				context.drawImage(image, 0, 0, width, height);

				canvas.toBlob(
					compressedBlob => {
						const reader = new FileReader();
						reader.readAsDataURL(compressedBlob);
						reader.onloadend = () => {
							const compressedImageDataUrl = reader.result;
							resolve(compressedImageDataUrl);
						};
					},
					'image/jpeg', // Change this to 'image/png' if your image format is PNG
					0.9, // Adjust the compression quality as needed (0.0 to 1.0)
				);
			};

			image.onerror = error => {
				reject(error);
			};
		});
	};

	const captureImage = async () => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');

		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		console.log('witdh', canvas.width);
		console.log('height', canvas.width);

		context.drawImage(
			videoRef.current,
			0,
			0,
			videoRef.current.videoWidth,
			videoRef.current.videoHeight,
		);

		const image = new Image();
		image.src = canvas.toDataURL();

		const compressedImageDataUrl = await compressImage(
			image.src,
			300, // Ancho máximo deseado (ajústalo según tus necesidades)
			300, // Altura máxima deseada (ajústalo según tus necesidades)
		);

		setCapturedImage(compressedImageDataUrl);

		if (model) {
			const prediction = await model.predict(image);
			console.log('prediction', prediction);

			// Obtener la clase con la probabilidad más alta
			let maxProbability = 0;
			let detectedClass = '';
			prediction.forEach(classPrediction => {
				if (classPrediction.probability > maxProbability) {
					maxProbability = classPrediction.probability;
					detectedClass = classPrediction.className;
				}
			});

			setObjectInCamera(detectedClass);
		}
	};

	const handleCaptureImage = () => {
		captureImage();
		setselectedFile(capturedImage);
	};

	const handleScanAgain = () => {
		setCapturedImage(null);
		setObjectInCamera('');
	};

	const handleConfirmObject = () => {
		setItem(objectInCamera);
		setselectedFile(capturedImage);
		setConfirm(!confirm);
	};

	const maxChars = 100;
	const navigate = useNavigate();
	const [item, setItem] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [selectedFile, setselectedFile] = useState(null);
	const [descripcionError, setDescripcionError] = useState('');
	const [office, setOffice] = useState([]);

	const handleFileChange = e => {
		const file = e.target.files[0];
		setselectedFile(file);

		const reader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleDescripcionChange = event => {
		const inputValue = event.target.value;
		const singleSpaceValue = inputValue.replace(/\s+/g, ' ');

		setDescripcion(singleSpaceValue);

		if (singleSpaceValue.length < 10 || singleSpaceValue.length > maxChars) {
			setDescripcionError('Description must be between 10 and 100 characters.');
		} else {
			setDescripcionError('');
		}
	};

	const handleSubmit = event => {
		event.preventDefault();

		if (descripcionError) {
			toast.error(descripcionError);
		} else {
			toast.success('Report create successful');
			setItem('');
			setDescripcion('');
			setTimeout(() => {
				navigate('/home');
			}, 1000);
		}
	};

	const remainingChars = maxChars - descripcion.length;

	useEffect(() => {
		const getOffices = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5000/api/v1/office/allOffices',
				);

				setOffice(response.data);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		getOffices();
	}, []);

	if (capturedImage) {
		const urlCompressed = Pako.gzip(capturedImage, { to: 'string' });
		console.log('compressed', urlCompressed);
	}

	return (
		<>
			{!modelStart ? (
				<Loading />
			) : (
				<>
					{!confirm ? (
						<div title='Scanner'>
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								flexDirection='column'
								overflow='overflow'
								mt={-5}
							>
								<Box>
									{capturedImage ? (
										<img
											src={capturedImage.src}
											alt='Captured'
											style={{ maxWidth: '100%', maxHeight: '100%' }}
										/>
									) : (
										<video
											ref={videoRef}
											style={{ maxWidth: '100%', maxHeight: '100%' }}
											autoPlay
										></video>
									)}
									<div style={{ fontFamily: 'Heebo, sans-serif' }}>
										{objectInCamera ? `We detect a ${objectInCamera}` : ''}
									</div>
									<canvas
										ref={canvasRef}
										style={{ display: 'none' }}
										width={videoRef.current ? videoRef.current.videoWidth : 640}
										height={
											videoRef.current ? videoRef.current.videoHeight : 480
										}
									></canvas>
								</Box>

								{capturedImage ? (
									<Box
										position='relative'
										display='flex'
										flexDirection='column'
										alignItems='center'
										margin={'0 auto'}
										marginTop={3}
										width='75%'
									>
										<img
											src={capturedImage}
											alt='Uploaded File'
											style={{ width: '100%', marginRight: '10px' }}
										/>
										<div
											style={{
												padding: '5px',
												fontWeight: 'bold',
												fontSize: '16px',
												color: '#333',
											}}
										>
											{objectInCamera ? `Detect a ${objectInCamera}` : ''}
										</div>

										<Box display={'flex'} alignItems={'center'}>
											<Button
												onClick={handleConfirmObject}
												type={'success'}
												props={{ width: '100%' }}
											>
												Confirm
											</Button>

											<Button
												type={'error'}
												onClick={handleScanAgain}
												width='100%'
											>
												Capture New Image
											</Button>
										</Box>
									</Box>
								) : (
									<Box
										position='relative'
										display='flex'
										flexDirection='column'
										alignItems='center'
										margin={'0 auto'}
										marginTop={3}
										width='75%'
									>
										<Box
											display={'flex'}
											flexDirection={'column'}
											alignItems={'center'}
										>
											<Button
												type={'success'}
												onClick={handleCaptureImage}
												width='100%'
											>
												Capture Image
											</Button>
										</Box>
									</Box>
								)}
							</Box>
						</div>
					) : (
						<ReportCamOn
							objectInCamera={objectInCamera}
							capturedImage={capturedImage}
							handleConfirmObject={handleConfirmObject}
						/>
					)}
				</>
			)}
		</>
	);
};

export default ObjectDetection;
