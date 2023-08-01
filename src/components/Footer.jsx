import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import FooterLogo from '../assets/Globant-White-Green-01.png';
import { styled } from '@mui/material/styles';

const FooterWrapper = styled('footer')({
	backgroundColor: 'rgba(0, 0, 0, 0.8)',
	color: '#fff',
	padding: '16px',
	marginTop: '20vh ',
});

const Footer = () => {
	return (
		<FooterWrapper>
			<Container maxWidth='auto' style={{ padding: '10px' }}>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						height: '150px',
						zIndex: '1',
					}}
				>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='space-between'
						width='100%'
					>
						<img
							src={FooterLogo}
							alt='Logo'
							style={{ height: '60px', marginTop: '5px' }}
						/>
						<Box flexDirection='column' style={{ padding: '10px' }}>
							<Typography fontSize='14px' color='white' fontWeight='bold'>
								<span style={{ marginLeft: 'auto' }}>Contact Us</span>
							</Typography>
							<Typography fontSize='16px' color='white'>
								Drop us a line
							</Typography>
							<Typography fontSize='16px' color='white'>
								<a
									href='mailto:hi@globant.com'
									style={{ color: 'inherit', textDecoration: 'none' }}
									onMouseOver={e => {
										e.currentTarget.style.textDecoration = 'underline';
									}}
									onMouseOut={e => {
										e.currentTarget.style.textDecoration = 'none';
									}}
								>
									hi@globant.com
								</a>
							</Typography>
						</Box>
					</Box>
				</Box>
			</Container>
		</FooterWrapper>
	);
};

export default Footer;
