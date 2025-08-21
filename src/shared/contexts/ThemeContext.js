import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

const defaultTheme = {
  textColor: '#484848',
  backgroundColor: '#ffffff',
  borderColor: '#dddddd',
  fontFamily: 'Arial'
};

export const ThemeProvider = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('themeSettings');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });
  const [muiTheme, setMuiTheme] = useState(() =>
    createTheme({
      palette: { primary: { main: defaultTheme.textColor } },
    })
  );

  // Apply theme whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--font-family', theme.fontFamily);

    setMuiTheme(
      createTheme({
        palette: { primary: { main: theme.textColor } },
      })
    );

    // localStorage.setItem('themeSettings', JSON.stringify(theme));
  }, [theme]);

  // Stable function that won't change between renders
  const fetchTenantTheme = useCallback(async (tenantKey) => {
    try {
      // Mock response - replace with real API call
      const mockThemeSettings = {
        textColor: '#3a3a3a',
        backgroundColor: '#f8f9fa',
        borderColor: '#ced4da',
        fontFamily: 'Helvetica, sans-serif'
      };

      console.log('tenantKey: ', tenantKey);
      
      const mergedTheme = { ...defaultTheme, ...mockThemeSettings };
      console.log('MergedTheme: ', mergedTheme);
      setTheme(mergedTheme);
      setCurrentTenant(tenantKey);
      return mergedTheme;
    } catch (error) {
      console.error('Error fetching tenant theme:', error);
      setTheme(defaultTheme);
      return defaultTheme;
    }
  }, []); // Empty dependency array means this function is stable

  const updateTheme = useCallback((newSettings) => {
    setTheme(prev => ({ ...prev, ...newSettings }));
  }, []);

  const resetTheme = useCallback(() => {
    setTheme(defaultTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme,
      updateTheme,
      resetTheme,
      currentTenant,
      fetchTenantTheme // Now stable between renders
    }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
