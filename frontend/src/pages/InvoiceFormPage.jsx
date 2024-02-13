import { Fragment, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';
import { useGetClientsQuery } from '../slices/clientApiSlice';
import { useCreateInvoiceMutation } from '../slices/invoiceApiSlice';
import addCurrency from '../utils/addCurrency';

const InvoiceFormPage = () => {
  const [items, setItems] = useState([{ item: '', rate: 0, hours: 0 }]);
  const [clientDetails, setClientDetails] = useState([]);

  const navigate = useNavigate();

  const { data: clientData } = useGetClientsQuery();

  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const handleClientChange = e => {
    setClientDetails(e.target.value);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...items];
    list[index][name] = value;
    setItems(list);
  };

  const handleAddItem = () => {
    setItems([...items, { item: '', rate: 0, hours: 0 }]);
  };

  // Total amount
  const total = items.reduce((acc, item) => acc + item.rate * item.hours, 0);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const invoiceData = {
        clientId: clientDetails[0]._id,
        items,
        totalAmount: total
      };
      console.log(invoiceData);
      await createInvoice(invoiceData);
      navigate('/invoices');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack alignItems={'center'}>
      <Stack sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }}>
        <Box>
          <Typography variant='h6' component='h2' sx={{ marginBottom: 4 }}>
            Generate Invoice
          </Typography>
        </Box>
        <Form onSubmit={submitHandler}>
          <Stack sx={{ minHeight: '80vh' }}>
            <Stack flexGrow={1}>
              <FormControl variant='standard'>
                <InputLabel>Client</InputLabel>
                <Select
                  fullWidth
                  multiple
                  onChange={handleClientChange}
                  value={clientDetails}
                  label='Client'
                  sx={{ marginBottom: 4 }}
                >
                  {clientData?.map(client => (
                    <MenuItem key={client._id} value={client}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <Avatar
                          variant='square'
                          srcSet={client.picture}
                          alt={client.name}
                          sx={{ marginRight: 1, borderRadius: 1 }}
                        />
                        <Typography variant='h6' fontSize={16}>
                          {client.name}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
                <Grid container spacing={1}>
                  {items?.map((item, index) => (
                    <Fragment key={index}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type='text'
                          name='item'
                          label='Item'
                          variant='standard'
                          value={item.item}
                          onChange={e => handleChange(index, e)}
                          sx={{ marginBottom: 4 }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          type='number'
                          name='rate'
                          label='Rate'
                          variant='standard'
                          value={item.rate}
                          onChange={e => handleChange(index, e)}
                          sx={{ marginBottom: 4 }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          fullWidth
                          type='number'
                          name='hours'
                          label='Hours'
                          variant='standard'
                          value={item.hours}
                          onChange={e => handleChange(index, e)}
                          sx={{ marginBottom: 4 }}
                        />
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
              </FormControl>
              <Box sx={{ alignSelf: 'end', marginBottom: 4 }}>
                <Button onClick={handleAddItem}>Add item</Button>
              </Box>
            </Stack>
            <Stack sx={{ marginBottom: 4 }}>
              <Divider />
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{ paddingTop: 4, paddingBottom: 4 }}
              >
                <Box>Total</Box>
                <Box>
                  <Typography variant='h6' component='h2'>
                    {addCurrency(total)}
                  </Typography>
                </Box>
              </Stack>
              <Button
                fullWidth
                size='large'
                variant='contained'
                type='submit'
                disabled={isLoading}
              >
                Done
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Stack>
    </Stack>
  );
};

export default InvoiceFormPage;
