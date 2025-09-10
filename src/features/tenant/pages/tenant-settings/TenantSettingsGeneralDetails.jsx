import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { updateTenant, getTenantByKey } from '../../services/tenantService';
import ImageUpload from '../../../../shared/components/ImageUpload';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../auth/context/AuthContext';
import { formatSocialUrl } from '../../../../shared/utils/urlUtils';

const fontFamilies = [
  'Roboto',
  'Arial',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
];

const TenantSettingsGeneralDetails = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      motto: '',
      description: '',
      phone: '',
      tiktok: '',
      instagram: '',
      address: '',
      textColor: '#222222',
      backgroundColor: '#ffffff',
      borderColor: '#cccccc',
      fontFamily: 'Roboto',
      tenantInfo: {
        logoImage: '',
        coverPicture: '',
      },
    },
  });

  // Watch for image values to show previews
  const logoImage = watch('tenantInfo.logoImage');
  const coverPicture = watch('tenantInfo.coverPicture');

  const { tenantKey } = useParams();
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();

  useEffect(() => {
    const fetchTenant = async () => {
      if (!tenantKey) return;
      try {
        const tenant = await getTenantByKey(tenantKey);
        if (tenant) {
          console.log('tenant: ', tenant);
          reset({
            name: tenant.name || '',
            schemaName: tenant.schemaName || '',
            motto: tenant.motto || '',
            description: tenant.description || '',
            phone: tenant.phone || '',
            tiktok: tenant.tiktok || '',
            instagram: tenant.instagram || '',
            address: tenant.address || '',
            textColor: tenant.textColour || '#222222',
            backgroundColor: tenant.backgroundColour || '#ffffff',
            borderColor: tenant.borderColour || '#cccccc',
            fontFamily: tenant.font || 'Roboto',
            tenantInfo: {
              logoImage: tenant.logoUrl || '',
              coverPicture: tenant.coverPictureUrl || '',
            },
          });
        }
      } catch (err) {
        console.error('Failed to fetch tenant', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [tenantKey, reset]);

  const buildPayload = (formData) => ({
    name: formData.name,
    motto: formData.motto,
    description: formData.description,
    phone: formData.phone,
    tiktok: formatSocialUrl(formData.tiktok, 'tiktok'),
    instagram: formatSocialUrl(formData.instagram, 'instagram'),
    address: formData.address,
    textColour: formData.textColor,
    backgroundColour: formData.backgroundColor,
    borderColour: formData.borderColor,
    font: formData.fontFamily,
    logo: formData.tenantInfo.logoImage,
    coverPicture: formData.tenantInfo.coverPicture,
  });

  const onSubmit = async (data) => {
    if(!tenantKey) return;
    try {
      await updateTenant(buildPayload(data), tenantKey, token);
    } catch (err) {
      console.error('Failed to update tenant', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
      {/* General Info Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          General Information
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Tenant Name"
            {...register('name', { required: 'Tenant Username is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            required
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Tenant Schema Name"
            {...register('schemaName', { required: 'Tenant Schema Name is required' })}
            error={!!errors.schemaName}
            helperText={errors.schemaName?.message}
            fullWidth
            required
            variant="standard"
            disabled
            InputLabelProps={{ shrink: true }}
          />

          <div className="w-full flex justify-center items-center">
            <ImageUpload
              name="tenantInfo.logoImage"
              headerName="Logo image"
              register={register}
              setValue={setValue}
              errors={errors}
              value={logoImage}
              innerStyle="h-52 w-52"
              validationRules={{
                required: {
                  value: false,
                  message: 'Logo Image is required',
                },
              }}
            />
          </div>

          <div className="w-full">
            <ImageUpload
              name="tenantInfo.coverPicture"
              headerName="Cover image"
              register={register}
              setValue={setValue}
              errors={errors}
              value={coverPicture}
              innerStyle="h-52"
              validationRules={{
                required: {
                  value: false,
                  message: 'Cover Image is required',
                },
              }}
            />
          </div>

          <TextField
            label="Motto"
            {...register('motto')}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Description"
            {...register('description')}
            fullWidth
            multiline
            minRows={2}
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Phone"
            {...register('phone')}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="TikTok"
            {...register('tiktok')}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Instagram"
            {...register('instagram')}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Address Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Address
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Address"
            {...register('address')}
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Theme Settings Section */}
      <Box>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Theme Settings
        </Typography>
        <Grid
          container
          spacing={2}
          mb={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={4}>
            <InputLabel shrink htmlFor="text-color-picker">
              Text Color
            </InputLabel>
            <TextField
              id="text-color-picker"
              type="color"
              {...register('textColor')}
              sx={{ width: 60, minWidth: 0, mt: 1 }}
              variant="standard"
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel shrink htmlFor="background-color-picker">
              Background Color
            </InputLabel>
            <TextField
              id="background-color-picker"
              type="color"
              {...register('backgroundColor')}
              sx={{ width: 60, minWidth: 0, mt: 1 }}
              variant="standard"
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel shrink htmlFor="border-color-picker">
              Border Color
            </InputLabel>
            <TextField
              id="border-color-picker"
              type="color"
              {...register('borderColor')}
              sx={{ width: 60, minWidth: 0, mt: 1 }}
              variant="standard"
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
        </Grid>
        <Box>
          <Select
            id="font-family-select"
            {...register('fontFamily')}
            defaultValue={fontFamilies[0]}
            fullWidth
            size="small"
            sx={{ mt: 1 }}
            variant="standard"
            InputLabelProps={{ shrink: true }}
          >
            {fontFamilies.map((font) => (
              <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600, borderRadius: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TenantSettingsGeneralDetails;