import { Add } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import InvoiceCard from '../components/InvoiceCard';
import { Link } from 'react-router-dom';
import { useGetInvoicesQuery } from '../slices/invoiceApiSlice';

const InvoicePage = () => {
  const { data: invoiceData } = useGetInvoicesQuery();
  console.log(invoiceData)
  // const invoiceData = [
  //   {
  //     invoice_number: '001',
  //     date: 'February 11, 2024',
  //     bill_to: 'ABC Corporation',
  //     description: 'Consulting Services',
  //     quantity: '10 hours',
  //     rate: '$100 per hour',
  //     total: '$1000',
  //     status: 'pending'
  //   },
  //   {
  //     invoice_number: '002',
  //     date: 'February 11, 2024',
  //     bill_to: 'XYZ Enterprises',
  //     description: 'Graphic Design Work',
  //     quantity: '20 hours',
  //     rate: '$50 per hour',
  //     total: '$1000',
  //     status: 'paid'
  //   },
  //   {
  //     invoice_number: '003',
  //     date: 'February 11, 2024',
  //     bill_to: 'John Doe',
  //     description: 'Website Development',
  //     quantity: '1 project',
  //     rate: '$2000 per project',
  //     total: '$2000',
  //     status: 'paid'
  //   },
  //   {
  //     invoice_number: '004',
  //     date: 'February 11, 2024',
  //     bill_to: 'Jane Smith',
  //     description: 'Copywriting Services',
  //     quantity: '5 articles',
  //     rate: '$150 per article',
  //     total: '$750',
  //     status: 'pending'
  //   },
  //   {
  //     invoice_number: '005',
  //     date: 'February 11, 2024',
  //     bill_to: 'Smith & Co.',
  //     description: 'Marketing Campaign Management',
  //     quantity: '1 campaign',
  //     rate: '$5000 per campaign',
  //     total: '$5000',
  //     status: 'pending'
  //   }
  // ];

  return (
    <Box>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Box>
          <Typography variant='h6' component='h2' sx={{ flexGrow: 1 }}>
            Invoice List
          </Typography>
        </Box>
        <Box>
          <Link to={'/add-invoice'}>
            <Button variant='contained' startIcon={<Add />}>
              Add New
            </Button>
          </Link>
        </Box>
      </Stack>
      <InvoiceCard invoiceData={invoiceData} />
    </Box>
  );
};

export default InvoicePage;
