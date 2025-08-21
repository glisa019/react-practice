import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Contact = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <div className="container mx-auto p-6 h-full flex justify-center items-center">
     <div className="min-w-[500px] max-w-[1200px]">
     <h1 className="text-4xl font-bold text-primary">{t("CONTACT.HEADER")}</h1>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            }
          })}
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("email", {
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
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("message", {
            required: {
              value: true,
              message: "Message is required",
            },
          })}
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4} // Adjust the number of rows as needed
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        <div className="w-full flex justify-center">
        <Button className="w-fit" type="submit" variant="contained">{t("GLOBAL.SUBMIT")}</Button>
        </div>

      </form>
     </div>
    </div>
  );
};

export default Contact;
