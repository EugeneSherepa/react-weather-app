/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import cn from 'classnames'
import i18n from 'i18next';
import enTranslations from './translations/en.json';
import ukTranslations from './translations/uk.json';
import { Search } from './Search/Search';
import { ErrorMessage } from './ErrorMeassage/ErrorMessage'
import { Image } from './helpers/helpers';
import './App.css'

type WeatherData = {
  main: {
    temp: number;
    humidity: number;
  };

  wind: {
    speed: number;
  };
  
  weather: {
    main: string;
  }[];
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      uk: { translation: ukTranslations }
    },
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState('');
  const [showWeather, setShowWeather] = useState(false);
  const [containerHeight, setContainerHeight] = useState(105);

  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5fa0b5c5cd87a89023e3bd614dac1748`;

  useEffect(() => {
    if (city) {
      setError('')
      fetch(url)
        .then(res => res.json())
        .then(json => setWeather(json.list[0]))
        .catch(error => {
          setError(error);
          setWeather(null);
          setContainerHeight(380);
          document.body.className = 'error'
        })
        .finally(() => setShowWeather(true))
    }
  }, [city, url]);

  return (
    <>
      <div className="language-container">
        <button 
          className="lan-box eng" 
          onClick={() => handleLanguageChange('en')}
        />
        <button 
          className="lan-box ukr" 
          onClick={() => handleLanguageChange('uk')}
        />
      </div>
      <div 
        className="container"
        style={{ height: `${containerHeight}px` }}
      >
        <>
          <Search 
            setCity={setCity} 
            setContainerHeight={setContainerHeight}
            t={t}
          />

          {error && (
            <ErrorMessage 
              error={error}
            />
          )}

          {weather && (
            <>
            <div className={cn('weather-box', {
              'fadeIn' : showWeather
            })}>
              <img className="image" src={Image(weather.weather[0].main)}/>
              <p className="temperature">{Math.ceil(weather.main.temp - 273)}&#8451;</p>
              <p className="description">{t('weatherDescriptions.' + weather.weather[0].main)}</p>
            </div>
            <div className={cn('weather-details', {
              'fadeIn': showWeather
            })}>
              <div className="humidity">
                <i className="fa-solid fa-water"></i>
                <div className="text">
                  {weather.main && (
                    <span>{weather.main.humidity}</span>
                  )}
                  <p>{t('humidity')}</p>
                </div>
              </div>
              <div className="wind">
                <i className="fa-solid fa-wind"></i>
                <div className="text">
                  <span>{weather.wind.speed} {t('kmPerHour')}</span>
                  <p>{t('windspeed')}</p>
                </div>
              </div>
            </div>
            </>
          )}
        </>
      </div>
    </>
  );
}
