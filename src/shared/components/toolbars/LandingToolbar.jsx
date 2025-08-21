import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import rsFlag from '../../../assets/flags/rs.svg';
import gbFlag from '../../../assets/flags/gb.svg';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';


const LANGUAGES = [
  { icon: gbFlag, name: 'English', lng: 'en', translationKey: 'GLOBAL.ENGLISH' },
  { icon: rsFlag, name: 'Serbian', lng: 'rs', translationKey: 'GLOBAL.SERBIAN' }
];

const LandingToolbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState(
    LANGUAGES.find(lang => lang.lng === i18n.language) || LANGUAGES[0]
  );

  const navigateTo = (url) => navigate(url);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.lng);
  };

  const NAV_ITEMS = [
    { id: 'home', translationKey: 'GLOBAL.HOME' },
    { id: 'features', translationKey: 'GLOBAL.FEATURES' },
    { id: 'pricing', translationKey: 'GLOBAL.PRICING' },
    { id: 'about', translationKey: 'GLOBAL.ABOUT' },
    { id: 'contact', translationKey: 'GLOBAL.CONTACT' },
  ];

  // tabs
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className="w-full border-b border-b-gray-200 flex items-center justify-between px-2 fixed bg-white z-50">
      <div className="flex space-x-4">
        <Tabs
          value={value} // Pass the numeric index as the value
          onChange={handleTabChange}
          aria-label="nav tabs example"
          role="navigation"
        >
          {NAV_ITEMS.map((item, index) => (
            <Tab
              className="h-16"
              key={item.id}
              label={t(item.translationKey)} // Use translation key for the label
              href={`#${item.id}`} // Use the `id` for the href
              value={index} // Set the value to the index
            />
          ))}
        </Tabs>
    </div>
      
    <div className="flex gap-2 items-center">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={selectedLanguage.lng} // Use the selected language's `lng` as the value
                    onChange={(event) => {
                      const selectedLng = event.target.value;
                      const language = LANGUAGES.find((lang) => lang.lng === selectedLng);
                      handleLanguageChange(language); // Update the selected language
                    }}
                    displayEmpty
                  >
                    {LANGUAGES.map((language) => (
                      <MenuItem key={language.lng} value={language.lng}>
                        <div className="flex items-center gap-2">
                          <img
                            src={language.icon}
                            alt={`${language.name} flag`}
                            width="18"
                            height="12"
                          />
                          <span>{t(language.translationKey)}</span>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


                <Button onClick={() => navigateTo('/login')} variant="outlined">{t("GLOBAL.SIGN_IN")}</Button>

</div>
    </div>
  );
};

export default LandingToolbar;