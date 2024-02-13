import { useEffect, useState } from 'react';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/clients');
    }
  }, [userInfo, navigate]);

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/clients');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack
      sx={{ minHeight: '100vh' }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Card
        elevation={4}
        sx={{ py: 6, px: 3, width: { xs: '100%', sm: '500px' } }}
      >
        <Typography variant='h6' component='h2' sx={{ marginBottom: 6 }}>
          Sign In
        </Typography>
        <Form onSubmit={submitHandler}>
          <TextField
            fullWidth
            type='email'
            label='Enter email'
            variant='outlined'
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            fullWidth
            type='password'
            label='Enter password'
            variant='outlined'
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <Button
            fullWidth
            size='large'
            variant='contained'
            type='submit'
            disabled={isLoading}
          >
            Sing in
          </Button>
        </Form>
        <Typography component='p' sx={{ marginTop: 2 }}>
          New Customer?
          <Link to={'/register'}>
            <Button variant='text' sx={{ textTransform: 'none' }}>
              Register
            </Button>
          </Link>
        </Typography>
      </Card>
    </Stack>
  );
};

export default LoginPage;
