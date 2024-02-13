/* eslint-disable react/prop-types */
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Navbar = ({ setToggleSidebar }) => {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          sx={{ mr: 2, display: { sm: 'none', xs: 'flex' } }}
          onClick={() => setToggleSidebar(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          INVOICE APP
        </Typography>

        <Box>
          <Avatar>A</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
