import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ mt: 4, py: 2, backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
      <Typography variant="body1">&copy; 2024 Productivity App. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
