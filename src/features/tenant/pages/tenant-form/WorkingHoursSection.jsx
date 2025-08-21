import { useFieldArray, useWatch } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const WorkingHoursSection = ({ control, register, errors }) => {
  const { fields } = useFieldArray({
    control,
    name: "workingHours"
  });

  // Get the current form values to check closed status
  const workingHoursValues = useWatch({
    control,
    name: "workingHours"
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold w-fit text-primary">Working Hours</h2>
      <div className="space-y-4 flex flex-col justify-center items-center">
        {fields.map((item, index) => {
          const isClosed = workingHoursValues?.[index]?.closed;

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <div className="w-24 font-medium">{item.day}</div>

              <div className="flex items-center gap-2">
                <TextField
                  {...register(`workingHours.${index}.openingTime`, {
                    required: {
                      value: !isClosed,
                      message: "Opening time is required",
                    },
                  })}
                  label="Opening Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  size="small"
                  error={!!errors.workingHours?.[index]?.openingTime}
                  helperText={errors.workingHours?.[index]?.openingTime?.message}
                  disabled={isClosed}
                />
                <span>to</span>
                <TextField
                  {...register(`workingHours.${index}.closingTime`, {
                    required: {
                      value: !isClosed,
                      message: "Closing time is required",
                    },
                    validate: (value) => {
                      if (isClosed) return true;
                      const openingTime = workingHoursValues?.[index]?.openingTime;
                      return (
                        !openingTime ||
                        value > openingTime ||
                        "Closing time must be after opening"
                      );
                    },
                  })}
                  label="Closing Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  size="small"
                  error={!!errors.workingHours?.[index]?.closingTime}
                  helperText={errors.workingHours?.[index]?.closingTime?.message}
                  disabled={isClosed}
                />
              </div>

              <FormControlLabel
                control={
                  <Checkbox
                    {...register(`workingHours.${index}.closed`)}
                    color="primary"
                  />
                }
                label="Closed"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkingHoursSection;