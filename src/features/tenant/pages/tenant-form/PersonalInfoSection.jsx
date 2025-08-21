import TextField from '@mui/material/TextField';

const PersonalInfoSection = ({ register, errors }) => {

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold w-fit text-primary">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          {...register("personalInfo.firstName", {
            required: {
              value: true,
              message: "First Name is required",
            },
          })}
          label="First Name"
          type="text"
          variant="standard"
          fullWidth
          error={!!errors.personalInfo?.firstName}
          helperText={errors.personalInfo?.firstName?.message}
        />

        {/* <TextField
          {...register("personalInfo.lastName", {
            required: {
              value: true,
              message: "Last Name is required",
            },
          })}
          label="Last Name"
          type="text"
          variant="standard"
          fullWidth
          error={!!errors.personalInfo?.lastName}
          helperText={errors.personalInfo?.lastName?.message}
        />

        <TextField
          {...register("personalInfo.email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          label="Email"
          type="text"
          variant="standard"
          fullWidth
          error={!!errors.personalInfo?.email}
          helperText={errors.personalInfo?.email?.message}
        />

        <TextField
          {...register("personalInfo.phone", {
            required: {
              value: true,
              message: "Phone is required",
            },
          })}
          label="Phone"
          type="text"
          variant="standard"
          fullWidth
          error={!!errors.personalInfo?.phone}
          helperText={errors.personalInfo?.phone?.message}
        /> */}
      </div>
    </div>
  );
};

export default PersonalInfoSection;