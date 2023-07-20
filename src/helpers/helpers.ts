import clouds from '../images/cloud.png'
import clearWeather from '../images/clear.png';
import rain from '../images/rain.png'
import snow from '../images/snow.png';
import mist from '../images/mist.png'

export const Image = (waht: string) => {
  switch (waht) {
    case('Clouds'):
      document.body.className = 'clouds';
      return clouds;

    case('Clear'):
      document.body.className = 'clear';
      return clearWeather;

    case('Rain'):
      document.body.className = 'rain';
      return rain;

    case('Snow'):
      document.body.className = 'snow';
      return snow;

    case('Mist'): {
      document.body.className = 'mist';
      return mist;
    }
  }
}