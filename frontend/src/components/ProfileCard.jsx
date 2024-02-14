/* eslint-disable react/prop-types */
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Stack,
  Card
} from '@mui/material';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { BASE_URL } from '../constants';

const ProfileCard = ({
  menuOpen,
  anchorEl,
  handleMenuClick,
  handleMenuClose,
  clientData
}) => {
  return (
    <>
      {clientData?.map((client, index) => (
        <Box key={index} sx={{ paddingTop: 2 }}>
          <Card elevation={4}>
            <Stack flexDirection={'row'} alignItems={'center'} p={1}>
              <Grid
                container
                sx={{
                  flexGrow: 1,
                  alignItems: 'center',
                  marginRight: 1,
                  paddingLeft: { xs: 2, sm: 0 }
                }}
              >
                <Grid
                  container
                  item
                  md={5}
                  sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' }
                  }}
                >
                  <Grid item md={4}>
                    <Avatar
                      variant='square'
                      srcSet={`${BASE_URL}${client.picture}`}
                      alt={client.name}
                      sx={{ borderRadius: 1 }}
                    />
                  </Grid>

                  <Grid item md={8}>
                    <Typography variant='h6' fontSize={16}>
                      {client.name}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={7}
                  item
                  sx={{
                    flexDirection: { xs: 'column', md: 'row' }
                  }}
                >
                  <Grid item md={8}>
                    <Typography variant='h6' fontSize={16}>
                      {client.email}
                    </Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Typography variant='h6' fontSize={16}>
                      {client.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Box>
                <IconButton onClick={handleMenuClick}>
                  <MoreVert />
                </IconButton>
                <Menu
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  sx={{
                    '& .MuiPaper-root': {
                      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.05)'
                    }
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <Edit sx={{ marginRight: 2 }} />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Delete sx={{ marginRight: 2 }} />
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Card>
        </Box>
      ))}
    </>
  );
};

export default ProfileCard;
