import "leaflet/dist/leaflet.css";
import './App.css';
import AppRouter from './routes/AppRouter';
import { ThemeProvider } from './shared/contexts/ThemeContext';
import { AuthProvider } from './features/auth/context/AuthContext';

function App() {
  return (
    <AuthProvider>
        <ThemeProvider>
          <div className="App">
            <AppRouter />
          </div>
        </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
