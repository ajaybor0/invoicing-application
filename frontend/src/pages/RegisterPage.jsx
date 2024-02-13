import { useEffect, useState } from 'react';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';

import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/clients');
    }
  }, [userInfo, navigate]);

  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/clients');
      } catch (error) {
        console.log(error);
      }
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
          Register
        </Typography>
        <Form onSubmit={submitHandler}>
          <TextField
            fullWidth
            type='text'
            label='Enter name'
            variant='outlined'
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
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
          <TextField
            fullWidth
            type='password'
            label='Confirm password'
            variant='outlined'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <Button
            fullWidth
            size='large'
            variant='contained'
            type='submit'
            disabled={isLoading}
          >
            Register
          </Button>
        </Form>
        <Typography component='p' sx={{ marginTop: 2 }}>
          Already have an account?
          <Link to={'/'}>
            <Button variant='text' sx={{ textTransform: 'none' }}>
              Sign in
            </Button>
          </Link>
        </Typography>
      </Card>
    </Stack>
  );
};

export default RegisterPage;
