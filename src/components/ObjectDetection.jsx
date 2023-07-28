/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

import technicalServiceImage from '../assets/technical-service-image.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Box,
	Button,
	Typography,

} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ResponsiveAppBar from './Navbar';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ReportCamOn from './ReportCamOn';

const ObjectDetection = () => {
	const Navigate = useNavigate();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [modelStart, setModelStart] = useState(false);
	const [capturedImage, setCapturedImage] = useState(null);
	const [objectInCamera, setObjectInCamera] = useState('');
	const [confirm, setConfirm] = useState(false);

	useEffect(() => {
		const runObjectDetection = async () => {
			await cocoSsd.load();
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
	}, []);

	const captureImage = async () => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');

		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;

		context.drawImage(
			videoRef.current,
			0,
			0,
			videoRef.current.videoWidth,
			videoRef.current.videoHeight,
		);

		const image = new Image();
		image.src = canvas.toDataURL();
		setCapturedImage(image.src);
		const model = await cocoSsd.load();
		const predictions = await model.detect(image);

		if (predictions[0]) {
			setObjectInCamera(predictions[0].class);
		} else {
			setObjectInCamera('');
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

	console.log('file', selectedFile);
	return (
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
								height={videoRef.current ? videoRef.current.videoHeight : 480}
							></canvas>
							<Box
								position='relative'
								top={5}
								left={0}
								right={0}
								textAlign='center'
								margin='0 auto'
								paddingTop={2}
								width='75%'
							>
								{!modelStart && (
									<div>
										<Typography
											variant='body1'
											marginBottom={2}
											fontWeight='bold'
										>
											Please wait for the scanner to start...
										</Typography>
									</div>
								)}
							</Box>
							<Box
								position='relative'
								top={5}
								left={0}
								right={0}
								textAlign='center'
								margin='0 auto'
								paddingTop={2}
								width='75%'
							></Box>
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

								<Box
									display={'flex'}
									flexDirection={'column'}
									alignItems={'center'}
								>
									<Button
										onClick={handleConfirmObject}
										type={'success'}
										props={{ width: '100%' }}
									>
										Confirm
									</Button>

									<Button type={'error'} onClick={handleScanAgain} width='100%'>
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
	);
};

export default ObjectDetection;
