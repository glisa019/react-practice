import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createTenant } from '../../services/tenantService';
import PersonalInfoSection from './PersonalInfoSection';
import TenantInfoSection from './TenantInfoSection';
import LocationSection from "./LocationSection";
import WorkingHoursSection from './WorkingHoursSection';
import EmployeesSection from './EmployeesSection';
import EmployeeServicesSection from './EmployeeServicesSection';
import ThemeSettingsSection from './ThemeSettingsSection';
import Button from '@mui/material/Button';
import { useAuth } from '../../../auth/context/AuthContext';
import { formatSocialUrl } from '../../../../shared/utils/urlUtils';

const TenantForm = () => {
  const navigate = useNavigate();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const {token} = useAuth();

  let { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      tenantInfo: {
        name: "",
        schemaName: "",
        coverPicture: "",
        logo: "",
        motto: "",
        description: "",
        phone: "",
        tiktok: "",
        instagram: ""
      },
      location: {
        address: "",
        lat: "",
        lng: ""
      },
      workingHours: days.map(day => ({
        day,
        openingTime: '09:00',
        closingTime: '17:00',
        closed: false
      })),
      employees: [{
        firstName: "",
        lastName: "",
        role: "",
        email: ""
      }],
      employeeServices: [{
        name: "",
        price: "",
        duration: "",
        description: ""
      }],
      themeSettings: {
        textColor: "#484848",
        backgroundColor: "#ffffff",
        borderColor: "#808080",
        fontFamily: "Arial"
      }
    }
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const payload = {
      name: data.tenantInfo.name,
      schemaName: data.tenantInfo.schemaName,
      description: data.tenantInfo.description,
      motto: data.tenantInfo.motto,
      address: data.location.address,
      phone: data.tenantInfo.phone,
      tiktok: formatSocialUrl(data.tenantInfo.tiktok, 'tiktok'),
      instagram: formatSocialUrl(data.tenantInfo.instagram, 'instagram'),
      textColour: data.themeSettings.textColor,
      backgroundColour: data.themeSettings.backgroundColor,
      borderColour: data.themeSettings.borderColor,
      font: data.themeSettings.fontFamily,
      logo: data.tenantInfo.logo,
      coverPicture: data.tenantInfo.coverPicture,
    };

    try {
      const response = await createTenant(payload, token);
      if(response.paymentUrl);
        window.location.href = response.paymentUrl

    } catch (error) {
      console.error('Error creating tenant:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}className="p-8 space-y-8 max-w-4xl mx-auto">
    <div className="space-y-4">
      <TenantInfoSection register={register} errors={errors} setValue={setValue} />
    </div>
    <div className="space-y-4">
      <LocationSection register={register} errors={errors} setValue={setValue} />
    </div>

    {/* Theme Settings */}
    <div className="space-y-4">
      <ThemeSettingsSection register={register} control={control} setValue={setValue} />
    </div>

    <div className="w-full flex justify-end">
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </div>
  </form>
  );
};

export default TenantForm;