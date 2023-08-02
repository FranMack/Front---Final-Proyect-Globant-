/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

import { Box, Button, Pagination, Stack } from '@mui/material';
import SearchUsers from '../commons/SearchUsers';
import UserItem from '../commons/UserItem';
import { TransformISOdate } from '../utils/functions';
import { orderAlphabetically } from '../utils/functions';
import { useSelector } from 'react-redux';

const AdminUsersList = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [searchLocation, setSearchLocation] = useState(null);
	

	const user = useSelector(state => state.user);

	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 8;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedReports = orderAlphabetically(users).slice(startIndex, endIndex);

	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage);
	};

	const handleSearchLocation = (e) => {

       
            setSearchLocation(e.target.value);
      
		
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const showAllTheUsers = event => {
		event.preventDefault();
		axios
			.get(`http://localhost:5000/api/v1/userAdmin/users-list`)
			.then(res => setUsers(res.data))
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/v1/userAdmin/users-list")
			.then(res => setUsers(res.data))
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		axios
			.get(
				`http://localhost:5000/api/v1/userAdmin/search?searchValue=${search}`,
			)
			.then(res => setUsers(res.data))
			.catch(err => console.log(err));
	}, [search]);

	useEffect(() => {
		if (searchLocation) {
			axios
				.get(
					`http://localhost:5000/api/v1/userAdmin/search-location?searchValue=${searchLocation}`,
				)
				.then(res => setUsers(res.data))
				.catch(err => console.log(err));
		}
	}, [searchLocation])

  console.log("searchlocation",searchLocation)

	return (
		<>
			<Navbar />
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					height: '10%',
					borderBottom: '1px solid grey',
				}}
			>
				<Box sx={{ marginLeft: { xs: '10%', md: '3%' } }}>
					<h3 style={{ color: 'grey' }}>Users list</h3>
				</Box>
			</Box>
			<Box
				sx={{
					height: '100vh',
					width: { xs: 'inherit', md: '600px' },
					display: 'flex,',
					margin: { xs: '0 auto', md: '3% auto' },
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '10%',
						marginTop: '5%',
					}}
				>
					<SearchUsers
						search={search}
                        handleSearch={handleSearch}
						handleSearchLocation={handleSearchLocation}
						searchLocation={searchLocation}
                        showAllTheUsers={showAllTheUsers}
				
						//showAllTheReports={showAllTheReports}
					/>
				</Box>

				<Stack sx={{ marginTop: '10%' }}>
					{paginatedReports.map((user, i) => {
						return (
							<div key={i}>
								<UserItem user={user} />
							</div>
						);
					})}
				</Stack>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						marginTop: '1rem',
					}}
				>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							marginTop: '1rem',
						}}
					>
						{users.length === 0 ? (
							<Button
								sx={{
									color: '#3AB54A',
									marginLeft: '5px',
									textDecoration: 'none',
								}}
							>
								Nothing to show
							</Button>
						) : (
							users.length > 6 && (
								<Pagination
									count={Math.ceil(users.length / itemsPerPage)}
									page={currentPage}
									onChange={handlePageChange}
									color='primary'
									showFirstButton
									showLastButton
									size='large'
								/>
							)
						)}
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default AdminUsersList;
