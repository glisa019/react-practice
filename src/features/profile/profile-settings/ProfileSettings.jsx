import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ProfileSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // Save settings logic here
    alert('Settings saved!');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 480,
        mx: 'auto',
        borderRadius: 4,
        bgcolor: '#ffffff',
        color: '#222222',
        fontFamily: 'Roboto, Arial, sans-serif',
        transition: 'all 0.3s',
        boxShadow: 'none',
        border: 'none',
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Profile Settings
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={3}>
        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={() => setNotifications((prev) => !prev)}
              color="primary"
            />
          }
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <NotificationsActiveIcon fontSize="small" />
              Enable Email Notifications
            </Box>
          }
        />
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
              color="primary"
            />
          }
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <DarkModeIcon fontSize="small" />
              Enable Dark Mode
            </Box>
          }
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Stack>
    </Paper>
  );
};

export default ProfileSettings;