import { useTheme } from '../../../../shared/contexts/ThemeContext';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const ThemeSettingsSection = ({ register, control, setValue }) => {
  const { updateTheme } = useTheme(); // Now this will work

  const handleThemeChange = (field, value) => {
    // Update form state
    setValue(field, value);
    // Update theme context
    const themeField = field.replace('themeSettings.', '');
    updateTheme({ [themeField]: value });
  };

  return (
    <div className="space-y-4 flex flex-col">
      <h2 className="text-xl font-bold w-fit text-primary">Theme Settings</h2>

      <div className="grid grid-cols-4 gap-4 items-center">
        {/* Text Color */}
        <div className="flex items-center gap-2">
          <InputLabel className="block text-sm font-medium text-gray-700 mb-1">
            Text Color
          </InputLabel>
          <TextField
            type="color"
            variant="outlined"
            fullWidth
            {...register("themeSettings.textColor")}
            onChange={(e) => handleThemeChange("themeSettings.textColor", e.target.value)}
            InputProps={{
              style: { height: "40px", width: "70px", padding: "0" },
            }}
          />
        </div>

        {/* Background Color */}
        <div className="flex items-center gap-2">
          <InputLabel className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </InputLabel>
          <TextField
            type="color"
            variant="outlined"
            fullWidth
            {...register("themeSettings.backgroundColor")}
            onChange={(e) => handleThemeChange("themeSettings.backgroundColor", e.target.value)}
            InputProps={{
              style: { height: "40px", width: "70px", padding: "0" },
            }}
          />
        </div>

        {/* Border Color */}
        <div className="flex items-center gap-2">
          <InputLabel className="block text-sm font-medium text-gray-700 mb-1">
            Border Color
          </InputLabel>
          <TextField
            type="color"
            variant="outlined"
            fullWidth
            {...register("themeSettings.borderColor")}
            onChange={(e) => handleThemeChange("themeSettings.borderColor", e.target.value)}
            InputProps={{
              style: { height: "40px", width: "70px", padding: "0" },
            }}
          />
        </div>
      </div>

      {/* Font Family Dropdown */}
      <div className="grid grid-cols-4">
        <div className="col-span-2">
          <FormControl fullWidth variant="outlined">
            <InputLabel>Font Family</InputLabel>
            <Select
              {...register("themeSettings.fontFamily")}
              onChange={(e) => handleThemeChange("themeSettings.fontFamily", e.target.value)}
              defaultValue=""
              label="Font Family"
            >
              {[
                { value: "Arial", label: "Arial" },
                { value: "Helvetica", label: "Helvetica" },
                { value: "Times New Roman", label: "Times New Roman" },
                { value: "Courier New", label: "Courier New" },
                { value: "Georgia", label: "Georgia" },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettingsSection;