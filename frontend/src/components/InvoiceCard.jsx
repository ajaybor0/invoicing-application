/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Stack,
  Chip,
  Card
} from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import addCurrency from '../utils/addCurrency';

const InvoiceCard = ({ handleMenuClick, invoiceData }) => {
  return (
    <>
      {invoiceData?.map((invoice, index) => (
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
                  xs={6}
                  sx={{
                    alignItems: 'center'
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <Typography variant='h6' fontSize={16}>
                      {invoice.clientId.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h6' fontSize={16}>
                      {invoice.clientId.phone}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  xs={6}
                  item
                  sx={{
                    alignItems: 'center',
                    textAlign: { xs: 'end', sm: 'left' }
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <Typography variant='h6' fontSize={16}>
                      Due{' '}
                      {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                      })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant='h6' fontSize={16}>
                      {addCurrency(invoice.totalAmount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Chip
                      label={invoice.status ? 'Paid' : 'Pending'}
                      color={invoice.status ? 'success' : 'primary'}
                      variant='outlined'
                      sx={{ width: 80 }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Box>
                <Link to={`/invoices/${invoice._id}`}>
                  <IconButton onClick={handleMenuClick}>
                    <KeyboardArrowRight />
                  </IconButton>
                </Link>
              </Box>
            </Stack>
          </Card>
        </Box>
      ))}
    </>
  );
};

export default InvoiceCard;
