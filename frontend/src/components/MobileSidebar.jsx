/* eslint-disable react/prop-types */
import { Group, Logout, Receipt } from '@mui/icons-material';
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { useDispatch } from 'react-redux';

const MobileSidebar = ({
  toggleSidebar,
  setToggleSidebar,
  selectedIndex,
  setSelectedIndex
}) => {
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
    <Drawer open={toggleSidebar} onClose={() => setToggleSidebar(false)}>
      <List
        sx={{
          minWidth: 250,
          minHeight: '100vh',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5'
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
    </Drawer>
  );
};

export default MobileSidebar;
