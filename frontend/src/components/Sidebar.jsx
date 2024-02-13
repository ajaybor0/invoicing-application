/* eslint-disable react/prop-types */
import { Group, Logout, Receipt } from '@mui/icons-material';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const Sidebar = ({ selectedIndex, setSelectedIndex }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      dispatch(logout());

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'block' },
        minWidth: 250,
        padding: 2,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Box position='fixed'>
        <List
          sx={{
            minHeight: '85vh',
            minWidth: 200,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box flexGrow={1}>
            <ListItem>
              <ListItemButton
                color='inherit'
                component={Link}
                to='/clients'
                selected={selectedIndex === 0}
                onClick={() => setSelectedIndex(0)}
              >
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary='Clients' />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                color='inherit'
                component={Link}
                to='/invoices'
                selected={selectedIndex === 1}
                onClick={() => setSelectedIndex(1)}
              >
                <ListItemIcon>
                  <Receipt />
                </ListItemIcon>
                <ListItemText primary='Invoices' />
              </ListItemButton>
            </ListItem>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant='outlined'
              size='small'
              color='error'
              startIcon={<Logout />}
              onClick={logoutHandler}
            >
              Sign out
            </Button>
          </Box>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
