import './Home.css';
import haircutSchedule from '../../../assets/haircut-schedule.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

const Home = () => {
   const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const navigateTo = (url) => {
    navigate(url);
  }

  return (
    <div className="relative">
      <div>
        <img className="home-image" src={haircutSchedule} />
      </div>
      <div className="absolute home-content">
        <div className="home-text mx-5">
          <h1 className="text-5xl font-bold mb-5 text-primary">{t("GLOBAL.HEADER")}</h1>
          <p className="text-2xl mb-5">{t("GLOBAL.DESCRIPTION")}</p>
        </div>

        <Button 
            onClick={() => navigateTo('/register')} 
            variant="contained">
              {t("GLOBAL.BECOME_A_TENANT")}
        </Button>
      </div>
    </div>
  );
};

export default Home;