import clouds from '../images/cloud.png'
import clearWeather from '../images/clear.png';
import rain from '../images/rain.png'
import snow from '../images/snow.png';
import mist from '../images/mist.png'

export const Image = (waht: string) => {
  switch (waht) {
    case('Clouds'):
      return clouds;

    case('Clear'):
      return clearWeather;

    case('Rain'):
      return rain;

    case('Snow'):
      return snow;

    case('Mist'): {
      return mist;
    }
  }
}