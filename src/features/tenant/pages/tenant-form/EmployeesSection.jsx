import { useFieldArray } from 'react-hook-form';
import { CiCirclePlus } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EmployeesSection = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "employees"
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold w-fit text-primary">Employees</h2>
      
      {fields.map((item, index) => (
        <div key={item.id} className="space-y-4 border border-tertiary p-4 rounded-lg relative">
          {/* <div className="flex justify-end absolute top-2 right-2">
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-primary hover:opacity-90"
            >
              <IoIosRemoveCircleOutline size={24} />
            </button>
          </div> */}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() => remove(index)}
              startIcon={<IoIosRemoveCircleOutline />}
            >
              Remove
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              {...register(`employees.${index}.firstName`, {
                required: {
                  value: true,
                  message: "First Name is required",
                },
              })}
              label="First Name"
              type="text"
              variant="standard"
              fullWidth
              error={!!errors.employees?.[index]?.firstName}
              helperText={errors.employees?.[index]?.firstName?.message}
            />

            <TextField
              {...register(`employees.${index}.lastName`, {
                required: {
                  value: true,
                  message: "Last Name is required",
                },
              })}
              label="Last Name"
              type="text"
              variant="standard"
              fullWidth
              error={!!errors.employees?.[index]?.lastName}
              helperText={errors.employees?.[index]?.lastName?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              {...register(`employees.${index}.role`, {
                required: {
                  value: true,
                  message: "Role is required",
                },
              })}
              label="Role"
              type="text"
              variant="standard"
              fullWidth
              error={!!errors.employees?.[index]?.role}
              helperText={errors.employees?.[index]?.role?.message}
            />

            <TextField
              {...register(`employees.${index}.email`, {
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
              error={!!errors.employees?.[index]?.email}
              helperText={errors.employees?.[index]?.email?.message}
            />
          </div>
        </div>
      ))}

<Button
  variant="contained"
  color="primary"
  startIcon={<CiCirclePlus size={24} />}
  onClick={() => append({ firstName: "", lastName: "", role: "", email: "" })}
>
  Add Employee
</Button>

    </div>
  );
};

export default EmployeesSection;