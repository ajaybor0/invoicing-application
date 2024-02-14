import { Delete, Download, Edit, MoreVert, Paid } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetInvoiceQuery,
  useSendInvoiceMutation,
  useUpdateInvoiceToPaidMutation
} from '../slices/invoiceApiSlice';
import addCurrency from '../utils/addCurrency';
import { BASE_URL } from '../constants';

import generatePDF from '../utils/generatePDF';

const InvoiceDetail = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const { id: invoiceId } = useParams();

  const { data: invoice } = useGetInvoiceQuery(invoiceId);
  const [sendInvoice, { isLoading }] = useSendInvoiceMutation();
  const [updateInvoiceToPaid] = useUpdateInvoiceToPaidMutation();

  const handleMenuClick = e => {
    setMenuOpen(true);
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const handleInvoiceToPaid = async invoiceId => {
    try {
      await updateInvoiceToPaid(invoiceId).unwrap();
      console.log('Updated successfully');
      navigate('/invoices');
    } catch (error) {
      console.log(error);
    }
  };

  const sendInvoiceHandler = async invoiceId => {
    try {
      await sendInvoice(invoiceId);
      console.log('Sent successfully');
      navigate('/invoices');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack alignItems={'center'}>
      <Stack
        direction={'column'}
        sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }}
      >
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant='h6' component='h2' sx={{ marginBottom: 4 }}>
            Invoice
          </Typography>
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
                  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)'
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
              <MenuItem
                disabled={invoice?.status}
                onClick={() => {
                  handleInvoiceToPaid(invoiceId), handleMenuClose();
                }}
              >
                <Paid sx={{ marginRight: 2 }} />
                Mark as paid
              </MenuItem>
              <MenuItem
                onClick={() => {
                  generatePDF(invoice);
                  handleMenuClose();
                }}
              >
                <Download sx={{ marginRight: 2 }} />
                Download PDF
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
        <Stack sx={{ minHeight: '80vh' }}>
          <Stack flexGrow={1} alignItems={'center'}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ width: '100%', marginBottom: 4 }}
            >
              <Typography variant='h6' fontWeight={400} fontSize={16}>
                Client
              </Typography>
              <Stack direction={'row'} alignItems={'center'}>
                <Avatar
                  variant='square'
                  srcSet={`${BASE_URL}${invoice?.clientId.picture}`}
                  alt={invoice?.clientId.name}
                  sx={{ borderRadius: 1, marginRight: 1 }}
                />
                <Typography variant='h6' fontWeight={400} fontSize={16}>
                  {invoice?.clientId.name}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ width: '100%', marginBottom: 4 }}
            >
              <Typography variant='h6' fontWeight={400} fontSize={16}>
                Email
              </Typography>
              <Typography variant='h6' fontWeight={400} fontSize={16}>
                {invoice?.clientId.email}
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ width: '100%', marginBottom: 4 }}
            >
              <Typography variant='h6' fontWeight={400} fontSize={16}>
                Phone number
              </Typography>
              <Typography variant='h6' fontWeight={400} fontSize={16}>
                {invoice?.clientId.phone}
              </Typography>
            </Stack>

            <Card
              elevation={0}
              sx={{
                width: '100%',
                padding: 2,
                backgroundColor: '#f5f5f5'
              }}
            >
              <Grid container spacing={1} sx={{ marginBottom: 4 }}>
                <Grid item xs={6}>
                  <Typography variant='h6' fontWeight={400} fontSize={16}>
                    Rate
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h6' fontWeight={400} fontSize={16}>
                    Rate
                  </Typography>
                </Grid>
                <Grid item xs={2} textAlign={'end'}>
                  <Typography variant='h6' fontWeight={400} fontSize={16}>
                    Hours
                  </Typography>
                </Grid>
              </Grid>
              {invoice?.items?.map(item => (
                <Grid
                  key={item._id}
                  container
                  spacing={1}
                  sx={{ marginBottom: 2 }}
                >
                  <Grid item xs={6}>
                    <Typography variant='h6' fontSize={16}>
                      {item.item}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='h6' fontSize={16}>
                      {addCurrency(item.rate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} textAlign={'end'}>
                    <Typography variant='h6' fontSize={16}>
                      {item.hours}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Divider sx={{ marginBottom: 2 }} />
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography variant='h6' fontWeight={400} fontSize={16}>
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={4} textAlign={'end'}>
                  <Typography variant='h6' fontSize={16}>
                    {addCurrency(invoice?.totalAmount)}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Stack>
          <Stack sx={{ marginBottom: 4 }}>
            <Button
              fullWidth
              size='large'
              variant='contained'
              disabled={isLoading}
              onClick={() => sendInvoiceHandler(invoiceId)}
            >
              Send invoice
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InvoiceDetail;
