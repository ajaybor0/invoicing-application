import { useState } from 'react';
import {
  Avatar,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';

import {
  useCreateClientMutation,
  useUploadClientImageMutation
} from '../slices/clientApiSlice';

import { BASE_URL } from '../constants';

const ClientFormPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [picture, setPicture] = useState('');
  console.log(picture);
  const [createClient, { isLoading }] = useCreateClientMutation();
  const [uploadClientPicture] = useUploadClientImageMutation();

  const navigate = useNavigate();

  const uploadFileHandler = async e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadClientPicture(formData).unwrap();
      setPicture(res.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const clientData = {
        name,
        email,
        phone,
        picture
      };
      await createClient(clientData);
      navigate('/clients');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack alignItems={'center'}>
      <Stack sx={{ width: { xs: '100%', sm: '80%', md: '60%' } }}>
        <Typography variant='h6' component='h2' sx={{ marginBottom: 4 }}>
          Client Information
        </Typography>
        <Form onSubmit={submitHandler}>
          <Stack sx={{ minHeight: '80vh' }}>
            <Stack flexGrow={1}>
              <InputLabel>Full name</InputLabel>
              <TextField
                fullWidth
                type='text'
                variant='standard'
                value={name}
                onChange={e => setName(e.target.value)}
                sx={{ marginBottom: 4 }}
              />
              <InputLabel>Email address</InputLabel>
              <TextField
                fullWidth
                type='email'
                variant='standard'
                value={email}
                onChange={e => setEmail(e.target.value)}
                sx={{ marginBottom: 4 }}
              />
              <InputLabel>Phone number</InputLabel>
              <TextField
                fullWidth
                type='text'
                variant='standard'
                value={phone}
                onChange={e => setPhone(e.target.value)}
                sx={{ marginBottom: 4 }}
              />
              <InputLabel>Profile picture</InputLabel>
              {picture !== '' ? (
                <Avatar
                  variant='square'
                  alt='Profile picture'
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    marginBottom: 4,
                    marginTop: 1
                  }}
                  srcSet={`${BASE_URL}${picture}`}
                />
              ) : (
                <TextField
                  fullWidth
                  type='file'
                  variant='standard'
                  onChange={uploadFileHandler}
                  sx={{ marginBottom: 4 }}
                />
              )}
            </Stack>
            <Stack>
              <Button
                fullWidth
                size='large'
                variant='contained'
                type='submit'
                disabled={isLoading}
                sx={{ marginBottom: 4 }}
              >
                Save client
              </Button>
            </Stack>
          </Stack>
        </Form>
      </Stack>
    </Stack>
  );
};

export default ClientFormPage;
