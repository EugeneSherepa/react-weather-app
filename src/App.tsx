/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import cn from 'classnames'
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
    description: string;
  }[];
};

export const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState('');
  const [showWeather, setShowWeather] = useState(false);
  const [containerHeight, setContainerHeight] = useState(105);

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
        })
        .finally(() => setShowWeather(true))
    }
  }, [city, url]);

  return (
    
    <div 
      className="container"
      style={{ height: `${containerHeight}px` }}
    >
      <>
        <Search 
          setCity={setCity} 
          setContainerHeight={setContainerHeight}
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
            <p className="description">{weather.weather[0]?.description}</p>
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
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              <i className="fa-solid fa-wind"></i>
              <div className="text">
                <span>{weather.wind.speed} Km/h</span>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
          </>
        )}
      </>
    </div>
  );
}
