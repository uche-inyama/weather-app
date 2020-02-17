import weatherApi from './fetchWeather';

const displayModule = (() => {
  let root = document.querySelector('#root');
  const form = document.createElement('form');
  const label = document.createElement('label');
  let input = document.createElement('input');
  const button = document.createElement('button');
  const imageWrapper = document.createElement('div');
  const select = document.createElement('select');
  const wrapper = document.createElement('div');
  const header = document.createElement('h1');
  const containerDiv = document.createElement('div');
  header.classList.add('header');
  select.setAttribute('class', 'temp-units');
  input.setAttribute('placeholder', 'Enter city');
  input.setAttribute('class', 'city');
  header.innerText = 'WEATHER APP';
  let option;

  const options = ['choose a unit', 'Celsius', 'Fahrenheit'];

  for (const unit of options) {
    const option = document.createElement('option');
    option.setAttribute('class', unit);
    option.setAttribute('value', unit);
    option.innerHTML = unit;
    select.append(option);
  }

  imageWrapper.classList.add('img-wrapper');
  const img = new Image();
  img.setAttribute('src', '');

  wrapper.setAttribute('class', 'row');
  input.setAttribute('class', 'search');
  input.setAttribute('type', 'search');
  label.setAttribute('for', 'search');
  button.setAttribute('class', 'btnSearch');
  button.setAttribute('type', 'submit');
  containerDiv.setAttribute('class', 'containerDiv');
  form.setAttribute('class', 'form');
  button.innerText = 'Enter';

  root.append(wrapper);
  wrapper.append(containerDiv);
  containerDiv.append(header);
  containerDiv.append(form);
  form.append(input);
  form.append(select);
  form.append(button);

  imageWrapper.append(img);

  button.addEventListener('click', data);

  function data(evt) {
    evt.preventDefault();
    const select = document.querySelector('.temp-units');
    option = select.value;
    const city = input.value;

    if (!city || !option) {
      alert('Please check, a required field(s) are empty');
    } else {
      if (option === 'celsius') {
        weatherApi.fetchWeatherC(city);
      } else {
        weatherApi.fetchWeatherF(city);
      }
      input.value = '';
    }
  }

  const weatherInfo = response => {
    let weatherImage = document.querySelector('.weatherImage');
    let weatherInfo = document.querySelector('.weatherInfo');

    if (weatherImage) {
      weatherImage.parentNode.removeChild(weatherImage);
    }

    if (weatherInfo) {
      weatherInfo.parentNode.removeChild(weatherInfo);
    }

    let cityTemp = document.createElement('div');
    const weatherDiv = document.createElement('div');
    const windDiv = document.createElement('div');
    const nameDiv = document.createElement('div');
    weatherInfo = document.createElement('div');
    weatherImage = document.createElement('div');

    weatherInfo.setAttribute('class', 'weatherInfo');
    weatherImage.setAttribute('class', 'weatherImage');

    wrapper.append(weatherImage);
    weatherImage.append(imageWrapper);
    wrapper.append(weatherInfo);
    weatherInfo.appendChild(cityTemp);
    weatherInfo.append(windDiv);
    weatherInfo.append(nameDiv);

    if (option === 'Celsius') {
      cityTemp.innerHTML = `Ambient temperature: ${response.main.temp} C`;
    } else {
      cityTemp.innerHTML = `Ambient temperature: ${response.main.temp} F`;
    }

    weatherDiv.innerHTML = `${response.weather[0].description}`;
    windDiv.innerHTML = `Wind speed: ${response.wind.speed} m/s.`;
    nameDiv.innerHTML = `City location: ${response.name}.`;
  };

  return {
    weatherInfo
  };
})();

export default displayModule;
