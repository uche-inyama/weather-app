import displayMod from './displayModule';
import giphyApi from './fetchGiphy';

const weatherApi = (() => {
  const APPID = 'f7b60f6f82b5a121d3e5692ae0173a3d';
  const baseURL =
    'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = (location, unit) => {
    const urlVar = `${baseURL}?q=${location}&APPID=${APPID}&units=${unit}`;
    fetch(urlVar, { mode: 'cors' })
      .then(async function(response) {
        const jsonObject = await response.json();
        displayMod.weatherInfo(jsonObject);
        return jsonObject.weather[0].description;
      })
      .then(giphyApi.fetchImage)
      .catch(() => {
        const weatherImage = document.querySelector('.weatherImage');
        const img_wrapper = weatherImage.querySelector('.img-wrapper');
        weatherImage.removeChild(img_wrapper);
        weatherImage.innerHTML =
          'You are seeing this message, because your spelling of the city is incorrect.';
      });
  };
  const fetchWeatherC = location => {
    fetchWeather(location, 'metric');
  };

  const fetchWeatherF = location => {
    fetchWeather(location, 'imperial');
  };

  return {
    fetchWeatherC,
    fetchWeatherF
  };
})();

export default weatherApi;
