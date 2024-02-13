import { Box, Stack } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Navigate, Outlet } from 'react-router-dom';
import MobileSidebar from './components/MobileSidebar';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const App = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { userInfo } = useSelector(state => state.auth);

  return userInfo ? (
    <>
      <Navbar setToggleSidebar={setToggleSidebar} />
      <Stack direction={'row'} sx={{ minHeight: '100vh' }}>
        <MobileSidebar
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
        <Sidebar
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Stack flexGrow={1}>
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Outlet />
          </Box>
          <Footer />
        </Stack>
      </Stack>
    </>
  ) : (
    <Navigate to='/' replace />
  );
};

export default App;
