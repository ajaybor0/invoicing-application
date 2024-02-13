import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { useGetClientsQuery } from '../slices/clientApiSlice';

const ClientPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data: clientData } = useGetClientsQuery();

  // Demo Data
  // const clientData = [
  //   {
  //     fullName: 'John Smith',
  //     emailAddress: 'john.smith@example.com',
  //     phoneNumber: '+1-555-123-4567',
  //     profilePicture: '../../public/john-smith-profile.jpg'
  //   },
  //   {
  //     fullName: 'Emily Brown',
  //     emailAddress: 'emily.brown@example.com',
  //     phoneNumber: '+1-555-234-5678',
  //     profilePicture: '../../public/emily-brown-profile.jpg'
  //   },
  //   {
  //     fullName: 'Michael Johnson',
  //     emailAddress: 'michael.johnson@example.com',
  //     phoneNumber: '+1-555-345-6789',
  //     profilePicture: '../../public/michael-johnson-profile.jpg'
  //   },
  //   {
  //     fullName: 'Jessica Davis',
  //     emailAddress: 'jessica.davis@example.com',
  //     phoneNumber: '+1-555-456-7890',
  //     profilePicture: '../../public/jessica-davis-profile.jpg'
  //   },
  //   {
  //     fullName: 'Daniel Wilson',
  //     emailAddress: 'daniel.wilson@example.com',
  //     phoneNumber: '+1-555-567-8901',
  //     profilePicture: '../../public/daniel-wilson-profile.jpg'
  //   },
  //   {
  //     fullName: 'Sarah Martinez',
  //     emailAddress: 'sarah.martinez@example.com',
  //     phoneNumber: '+1-555-678-9012',
  //     profilePicture: '../../public/sarah-martinez-profile.jpg'
  //   },
  //   {
  //     fullName: 'Christopher Taylor',
  //     emailAddress: 'christopher.taylor@example.com',
  //     phoneNumber: '+1-555-789-0123',
  //     profilePicture: '../../public/christopher-taylor-profile.jpg'
  //   },
  //   {
  //     fullName: 'Hannah Thomas',
  //     emailAddress: 'hannah.thomas@example.com',
  //     phoneNumber: '+1-555-890-1234',
  //     profilePicture: '../../public/hannah-thomas-profile.jpg'
  //   },
  //   {
  //     fullName: 'Matthew Anderson',
  //     emailAddress: 'matthew.anderson@example.com',
  //     phoneNumber: '+1-555-901-2345',
  //     profilePicture: '../../public/matthew-anderson-profile.jpg'
  //   },
  //   {
  //     fullName: 'Amanda Wilson',
  //     emailAddress: 'amanda.wilson@example.com',
  //     phoneNumber: '+1-555-012-3456',
  //     profilePicture: '../../public/amanda-wilson-profile.jpg'
  //   }
  // ];

  const handleMenuClick = e => {
    setMenuOpen(true);
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };
  return (
    <Box>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Box>
          <Typography variant='h6' component='h2' sx={{ flexGrow: 1 }}>
           Client List
          </Typography>
        </Box>
        <Box>
          <Link to={'/add-client'}>
            <Button variant='contained' startIcon={<Add />}>
              Add New
            </Button>
          </Link>
        </Box>
      </Stack>
      <ProfileCard
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleMenuClick={handleMenuClick}
        handleMenuClose={handleMenuClose}
        clientData={clientData}
      />
    </Box>
  );
};

export default ClientPage;
