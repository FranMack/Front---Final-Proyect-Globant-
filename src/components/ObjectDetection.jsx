import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { Box, Typography, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const ObjectDetection = () => {
	const Navigate = useNavigate();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [modelStart, setModelStart] = useState(false);
	const [capturedImage, setCapturedImage] = useState(null);
	const [objectInCamera, setObjectInCamera] = useState('');

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
		setCapturedImage(image);
		const model = await cocoSsd.load();
		const predictions = await model.detect(image);
		console.log('Object predictions:', predictions);
		if (predictions[0]) {
			setObjectInCamera(predictions[0].class);
		} else {
			setObjectInCamera('');
		}
	};

	const handleCaptureImage = () => {
		captureImage();
	};

	const handleScanAgain = () => {
		setCapturedImage(null);
		setObjectInCamera('');
	};

	const handleConfirmObject = () => {
		Navigate('/description');
	};

	return (
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
								<Typography variant='body1' marginBottom={2} fontWeight='bold'>
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
						<Box
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
						>
							<Button
								type={'success'}
								props={{ onClick: handleConfirmObject, width: '100%' }}
							>
								Confirm
							</Button>

							<Button
								type={'error'}
								props={{ onClick: handleScanAgain }}
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
	);
};

export default ObjectDetection;
