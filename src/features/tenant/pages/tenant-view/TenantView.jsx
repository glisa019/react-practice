import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import { AiFillTikTok } from 'react-icons/ai';
import { CiInstagram } from 'react-icons/ci';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { toPublicUrl, formatSocialUrl } from '../../../../shared/utils/urlUtils';
import { BASE_URL } from '../../../../shared/api';
import { useAuth } from '../../../auth/context/AuthContext';

const fallbackTenant = {
  coverPictureUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  logoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  name: 'Tenant',
  address: '',
  phone: '',
  motto: '',
  description: '',
  tiktok: '',
  instagram: '',
};

export const hasRole = (user, role) => {
  return user?.role === role; // Optional chaining handles null/undefined
};

const TenantView = () => {
  const navigate = useNavigate();
  const { tenant, loading } = useOutletContext() || {};
  const { tenantKey } = useParams();
  const { user } = useAuth();
  
    // Show Settings button only on /tenant/test/view... routes
    const showScheduleAppointment = hasRole(user, "CUSTOMER");

  if (loading || !tenant) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 4rem)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const data = tenant || fallbackTenant;
  const coverUrl = toPublicUrl(data.coverPictureUrl, BASE_URL);
  const logoUrl = toPublicUrl(data.logoUrl, BASE_URL);
  const tiktokUrl = formatSocialUrl(data.tiktok, 'tiktok');
  const instagramUrl = formatSocialUrl(data.instagram, 'instagram');


  return (
    <Box sx={{ minHeight: 'calc(100vh - 4rem)', bgcolor: '#f5f5f5' }}>
      {/* Cover Image */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 220, md: 320 },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)), url(${coverUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: -56,
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            width: { xs: 'calc(100% - 32px)', md: 500 },
            bgcolor: 'rgba(255,255,255,0.95)',
            borderRadius: 3,
            boxShadow: 3,
            px: 3,
            py: 2,
          }}
        >
          <Avatar
            src={logoUrl}
            alt="Logo"
            sx={{
              width: 90,
              height: 90,
              border: '3px solid #fff',
              boxShadow: 2,
              bgcolor: 'white',
            }}
          />
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 0.5,
                lineHeight: 1.1,
              }}
            >
              {data.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic',
                mb: 1,
              }}
            >
              {data.motto}
            </Typography>
            {
              showScheduleAppointment && 
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => navigate(`/tenant/${tenantKey}/employees-list`)}
                sx={{ borderRadius: 6, fontWeight: 600, mt: 1 }}
              >
                Schedule Appointment
              </Button>
            }
            
          </Box>
        </Box>
      </Box>
      {/* Main Content */}
      <Grid container justifyContent="center" sx={{ mt: { xs: 10, md: 12 }, px: 2 }}>
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              textAlign: 'left',
              mt: 2,
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                Address: <span style={{ color: '#222' }}>{data.address}</span>
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Phone: <span style={{ color: '#222' }}>{data.phone}</span>
              </Typography>
              <Typography variant="body1" sx={{ my: 2 }}>
                {data.description}
              </Typography>
              {(tiktokUrl || instagramUrl) && (
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  {tiktokUrl && (
                    <Button
                      href={tiktokUrl}
                      target="_blank"
                      startIcon={<AiFillTikTok />}
                      sx={{ textTransform: 'none' }}
                    >
                      TikTok
                    </Button>
                  )}
                  {instagramUrl && (
                    <Button
                      href={instagramUrl}
                      target="_blank"
                      startIcon={<CiInstagram />}
                      sx={{ textTransform: 'none' }}
                    >
                      Instagram
                    </Button>
                  )}
                </Box>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenantView;