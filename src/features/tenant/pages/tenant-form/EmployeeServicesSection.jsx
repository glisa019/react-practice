import { useFieldArray } from 'react-hook-form';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const EmployeeServicesSection = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "employeeServices"
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold w-fit text-primary">Services</h2>
      
      {fields.map((item, index) => (
        <div key={item.id} className="space-y-4 border border-tertiary p-4 rounded-lg">
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => remove(index)}
              startIcon={<IoIosRemoveCircleOutline />}
            >
              Remove
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              {...register(`employeeServices.${index}.name`, {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              label="Name"
              type="text"
              variant="standard"
              fullWidth
              error={!!errors.employeeServices?.[index]?.name}
              helperText={errors.employeeServices?.[index]?.name?.message}
            />

            <TextField
              {...register(`employeeServices.${index}.price`, {
                required: {
                  value: true,
                  message: "Price is required",
                },
              })}
              label="Price (RSD)"
              type="number"
              variant="standard"
              fullWidth
              error={!!errors.employeeServices?.[index]?.price}
              helperText={errors.employeeServices?.[index]?.price?.message}
            />

            <TextField
              {...register(`employeeServices.${index}.duration`, {
                required: {
                  value: true,
                  message: "Duration is required",
                },
              })}
              label="Duration"
              select
              variant="standard"
              fullWidth
              error={!!errors.employeeServices?.[index]?.duration}
              helperText={errors.employeeServices?.[index]?.duration?.message}
            >
              {[
                { value: "15min", label: "15 minutes" },
                { value: "30min", label: "30 minutes" },
                { value: "45min", label: "45 minutes" },
                { value: "1h", label: "1 hour" },
                { value: "1.5h", label: "1.5 hour" },
                { value: "2h", label: "2 hour" },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <TextField
            {...register(`employeeServices.${index}.description`)}
            label="Description"
            type="text"
            variant="standard"
            fullWidth
            multiline
            rows={4}
            error={!!errors.employeeServices?.[index]?.description}
            helperText={errors.employeeServices?.[index]?.description?.message}
          />
        </div>
      ))}

      <Button
        type="button"
        variant="contained"
        color="primary"
        startIcon={<CiCirclePlus />}
        onClick={() =>
          append({
            name: "",
            price: "",
            duration: "",
            description: "",
          })
        }
      >
        Add Service
      </Button>
    </div>
  );
};

export default EmployeeServicesSection;