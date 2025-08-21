import ImageUpload from '../../../../shared/components/ImageUpload';
import TextField from '@mui/material/TextField';
import { AiFillTikTok } from "react-icons/ai";
import { CiInstagram } from "react-icons/ci";

const TenantInfoSection = ({ register, errors, setValue }) => {

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold w-fit text-primary">Tenant Information</h2>

      <TextField
        {...register("tenantInfo.name", {
          required: {
          value: true,
          message: "Tenant Name is required",
        },
        })}
        label="Tenant Name"
        type="text"
        variant="standard"
        fullWidth
        error={!!errors.tenantInfo?.name}
        helperText={errors.tenantInfo?.name?.message}
      />

      <TextField
        {...register("tenantInfo.schemaName", {
          required: {
          value: true,
          message: "Tenant Schema Name is required",
        },
        })}
        label="Tenant Schema Name"
        type="text"
        variant="standard"
        fullWidth
        error={!!errors.tenantInfo?.schemaName}
        helperText={errors.tenantInfo?.schemaName?.message}
      />

      <div className="w-full flex justify-center items-center">
        <ImageUpload
          name="tenantInfo.logo"
          headerName="Logo image"
          register={register}
          setValue={setValue}
          errors={errors}
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
        {...register("tenantInfo.motto", {
          required: {
            value: true,
            message: "Motto is required",
          },
        })}
        label="Motto"
        type="text"
        variant="standard"
        fullWidth
        error={!!errors.tenantInfo?.motto}
        helperText={errors.tenantInfo?.motto?.message}
      />

      <TextField
        {...register("tenantInfo.description", {
          required: {
            value: true,
            message: "Description is required",
          },
        })}
        label="Description"
        type="text"
        variant="standard"
        fullWidth
        multiline
        rows={4}
        error={!!errors.tenantInfo?.description}
        helperText={errors.tenantInfo?.description?.message}
      />

      <TextField
        {...register("tenantInfo.phone", {
          required: {
            value: true,
            message: "Phone is required",
          },
        })}
        label="Phone"
        type="text"
        variant="standard"
        fullWidth
        error={!!errors.tenantInfo?.phone}
        helperText={errors.tenantInfo?.phone?.message}
      />

      <div className="flex gap-2">
        <div className="relative w-full">
          <TextField
            {...register("tenantInfo.tiktok")}
            label="Tiktok"
            type="text"
            variant="standard"
            fullWidth
            error={!!errors.tenantInfo?.tiktok}
            helperText={errors.tenantInfo?.tiktok?.message}
          />
          <AiFillTikTok className="absolute top-3 right-0 text-primary" size={24} />
        </div>

        <div className="relative w-full">
          <TextField
            {...register("tenantInfo.instagram")}
            label="Instagram"
            type="text"
            variant="standard"
            fullWidth
            error={!!errors.tenantInfo?.instagram}
            helperText={errors.tenantInfo?.instagram?.message}
          />
          <CiInstagram className="absolute top-3 right-0 text-primary" size={24} />
        </div>
      </div>
    </div>
  );
};

export default TenantInfoSection;