const {
  main, section, intro, form, message, features,
  notFound, placeTitle, result, largeImage,
  loader, footer,
} = require('./landing-page.js');

// initialize required element for result page
const input = document.querySelector('.search-field');
const clearIcon = document.querySelector('.cancel');

// for map api
const mapApi = 'https://www.mapquestapi.com/staticmap/v5/map?';
const mapApiKey = 'IvNAwSUNmSxFBKN37pVED3RuRscWNnGk';
const mapParam = '&zoom=14&defaultMarker=marker-end';


// function for converting temperature from Celsius to Fahrenheit
// or vice versa. The default unit from is Kelvin
const changeTemp = (temp) => {
  const tempItem = document.querySelector('.temp-item');
  const tempButton = document.querySelector('#temp-button');

  // convert Kelvin(initial unit to Celsius) and saves to
  // localStorage. Formula: C = K - 273.15
  if (!localStorage.getItem('tempUnit')) {
    localStorage.setItem('tempUnit', 'C');
    const tempValue = (temp - 273.15).toFixed(2);
    localStorage.setItem('tempValue', tempValue);

    // render changes to the DOM
    tempItem.innerHTML = `<i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Temperature:</span>
    <span class="condition-value">${localStorage.getItem('tempValue')}
    <span class="condition-unit">&#176;C</span></span>`;

    tempButton.innerHTML = `<i class="fa fa-thermometer thermo"></i>
    <span class="thermo-span">Convert &#176C to &#176F</span>`;

    // convert Fahrenheit to Celsius and saves to
    // localStorage. Formula: C = (F - 32) * 5/9
  } else if (localStorage.getItem('tempUnit') === 'F') {
    const tempValue = ((localStorage.getItem('tempValue') - 32) * (5 / 9)).toFixed(2);
    localStorage.setItem('tempUnit', 'C');
    localStorage.setItem('tempValue', tempValue);

    // render changes to DOM
    tempItem.innerHTML = `<i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Temperature:</span>
    <span class="condition-value">${localStorage.getItem('tempValue')}
    <span class="condition-unit">&#176;C</span></span>`;

    tempButton.innerHTML = `<i class="fa fa-thermometer thermo"></i>
    <span class="thermo-span">Convert &#176C to &#176F</span>`;

  // convert Celsius to Fahrenheit and saves to
  // localStorage. Formula: F = (F * 9/5) + 32
  } else {
    const tempValue = ((localStorage.getItem('tempValue') * (9 / 5)) + 32).toFixed(2);
    localStorage.setItem('tempUnit', 'F');
    localStorage.setItem('tempValue', tempValue);

    // render changes to the DOM
    tempItem.innerHTML = `<i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Temperature:</span>
    <span class="condition-value">${localStorage.getItem('tempValue')}
    <span class="condition-unit">&#176;F</span></span>`;

    tempButton.innerHTML = `<i class="fa fa-thermometer thermo"></i>
    <span class="thermo-span">Convert &#176F to &#176C</span>`;
  }
};


// function for switching between map view and earth view of the
// map. Accepts latitude and longitude of the location
const switchMap = (lat, lng) => {
  const switchButton = document.querySelector('#switch-button');
  const mainMap = document.querySelector('.result-map');

  // changing the map view to earth view. Set map to earth view when localstorage
  // is destroyed.
  if (localStorage.getItem('mapType') === 'map' || !localStorage.getItem('mapType')) {
    localStorage.setItem('mapType', 'hyb');

    const api = `${mapApi}&key=${mapApiKey}&locations=${lat},${lng}${mapParam}&type=hyb`;

    // render changes to DOM
    mainMap.setAttribute('style', `background-image: url('${api}');`);
    switchButton.innerHTML = `<i class="fa fa-toggle-off thermo"></i>
    <span class="thermo-span">Switch to Map View</span>`;

  // changes earth view to map view
  } else {
    localStorage.setItem('mapType', 'map');

    const api = `${mapApi}&key=${mapApiKey}&locations=${lat},${lng}${mapParam}&type=map`;

    // render changes to DOM
    mainMap.setAttribute('style', `background-image: url('${api}');`);
    switchButton.innerHTML = `<i class="fa fa-toggle-on thermo"></i>
    <span class="thermo-span">Switch to Satellite View</span>`;
  }
};


// declare functions so as to avoid
// no-use-before-define of eslint
let removeLarge = '';
let nextLarge = '';
let backLarge = '';

// display landmark image in large size. Accept a single image(image)
// to be enlarge and the entire array of the images found
const displayLarge = (image, allImages) => {
  // add styles and markup to the div containing
  // the image. Also appends the image to DOM
  largeImage.style.display = 'flex';
  largeImage.classList.add('large-image');
  largeImage.innerHTML = `<div class="back">
  <i id="back-icon" class="fa fa-chevron-circle-left image-next"></i></div>
  <div class="image" style="background-image: url(${image.largeImageURL})"></div>
  <div class="next"><i class="top fa fa-times image-next"></i>
  <i id="next-icon" class="bottom fa fa-chevron-circle-right image-next"></i></div>`;

  // icon for previous image of the slide
  const backIcon = document.querySelector('#back-icon');
  backIcon.addEventListener('click', () => {
    backLarge(image, allImages);
  });

  // icon for next image of the slide
  const nextIcon = document.querySelector('#next-icon');
  nextIcon.addEventListener('click', () => {
    nextLarge(image, allImages);
  });

  // icon for cancelling out of slide
  const cancelIcon = document.querySelector('.top');
  cancelIcon.addEventListener('click', () => {
    removeLarge();
  });

  // remove every other markup to create a slide format
  main.style.display = 'none';
  footer.style.display = 'none';
};


// cancel out large image viewing
removeLarge = () => {
  main.style.display = 'block';
  largeImage.style.display = 'none';
  footer.style.display = 'block';
};


// shows the next large image
nextLarge = (image, allImages) => {
  const index = allImages.indexOf(image);
  const newIndex = (index >= (allImages.length - 1))
    ? 0 : (index + 1);

  displayLarge(allImages[newIndex], allImages);
};


// shows the previous large image
backLarge = (image, allImages) => {
  const index = allImages.indexOf(image);
  const newIndex = (index === 0)
    ? (allImages.length - 1) : (index - 1);

  displayLarge(allImages[newIndex], allImages);
};


// displays the result of the search to the
// page when search request is successfull
const resultPage = (res, weatherData, pixaImages) => {
  // set page title
  document.title = `GeoSearch - ${res.formatted}`;

  // set result elements
  section.classList.add('form-2');
  intro.style.display = 'none';
  form.classList.add('result-field');
  features.style.display = 'none';
  message.classList.add('message-2');
  clearIcon.classList.add('cancel-2');
  clearIcon.style.display = 'block';

  // sets the postcode and title of the search
  placeTitle.style.display = 'block';
  placeTitle.classList.add('place-title');
  placeTitle.innerHTML = `<span>Postal Code: 
  ${res.components.postcode ? res.components.postcode : 'Not Available'}
  </span"><span class="right">Location: ${res.formatted}</span>`;

  // attaches the weather conditons of the place
  // onto the result page
  result.style.display = 'flex';
  result.classList.add('result');
  result.innerHTML = `<div class="result-features">
  <div class="weather-feature">
  <div style="background-image: 
  url('http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png');" 
  class="weather-cloud"></div>

  <div class="condition-box">
  <p class="cloud-description">${weatherData.weather[0].description}</p>
  <ul>

  <li class="temp-item"><i class="fa fa-circle condition-symbol"></i>
  <span class="condition-name">Temperature:</span>
  <span class="condition-value">
  ${localStorage.getItem('tempValue') || weatherData.main.temp}
  <span class="condition-unit">&#176;${localStorage.getItem('tempUnit') || 'F'}
  </span></span></li>

  <li><i class="fa fa-circle condition-symbol"></i>
  <span class="condition-name">Pressure:</span>
  <span class="condition-value">${weatherData.main.pressure}
  <span class="condition-unit">mb</span></span></li>

  <li><i class="fa fa-circle condition-symbol"></i>
  <span class="condition-name">Visibility:</span>
  <span class="condition-value">${weatherData.visibility || ''}
  <span class="condition-unit">${weatherData.visibility ? 'm' : 'N/A'}
  </span></span></li>

  <li><i class="fa fa-circle condition-symbol"></i>
  <span class="condition-name">Humidity:</span>
  <span class="condition-value">${weatherData.main.humidity}
  <span class="condition-unit">%</span></span></li>

  <li><i class="fa fa-circle condition-symbol"></i>
  <span class="condition-name">Wind Speed:</span>
  <span class="condition-value">${(weatherData.wind.speed * 2.237).toFixed(2)}
  <span class="condition-unit">mi/hr</span></span></li>

  <li><i class="fa fa-circle condition-symbol"></i>
  <span class="condition-name">Wind Direction:</span>
  <span class="condition-value">${weatherData.wind.deg || ''}
  <span class="condition-unit">${weatherData.wind.deg ? '&#176;' : 'N/A'}
  </span></span></li>

  <li><i class="fa fa-circle condition-symbol"></i>
  <span class="condition-name">Cloud Cover:</span>
  <span class="condition-value">${weatherData.clouds.all || ''}
  <span class="condition-unit">${weatherData.clouds.all ? '' : 'N/A'}
  </span></span></li>

  <li><i class="fa fa-circle condition-symbol"></i>
  <span class="condition-name">Timezone:</span>
  <span class="condition-value">
  ${Math.sign((weatherData.timezone / (60 * 60)))
    === 1 ? '+' : ''}${(weatherData.timezone / (60 * 60))}
  <span class="condition-unit">GMT</span></span></li>

  </ul></div></div>

  <div class="temp-feature">
  <button id="temp-button" type="button">
  <i class="fa fa-thermometer thermo"></i>
  <span class="thermo-span">Convert 
    ${localStorage.getItem('tempUnit') === 'C' ? 
    '&#176C to &#176F' : '&#176F to &#176C'}
  </span></button></div>

  <div class="share-feature">
  <button id="share-button" type="button">
  <a href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}" 
  target="_blank"><i class="fa fa-facebook thermo"></i>
  <span class="thermo-span">Share to Facebook</span></a>
  </button></div>

  <div class="switch-feature">
  <button id="switch-button" type="button">
  <i class="fa ${localStorage.getItem('mapType') === 'hyb'
    ? 'fa-toggle-on' : 'fa-toggle-off'} thermo"></i>
  <span class="thermo-span">Switch to 
    ${localStorage.getItem('mapType') === 'hyb' ? 'Satellite' : 'Map'}  View</span>
  </button></div>

  </div>
  <div class="result-map" style="background-image: 
  url('${mapApi}&key=${mapApiKey}&locations=${res.geometry.lat},${res.geometry.lng}${mapParam}&type=${localStorage.getItem('mapType') || 'map'}');">
  </div>`;


  // add click event to temperature conversion button
  const tempFeature = document.querySelector('.temp-feature');
  tempFeature.addEventListener('click', () => {
    changeTemp(weatherData.main.temp);
  });

  // add click event to map conversion button
  const switchFeature = document.querySelector('.switch-feature');
  switchFeature.addEventListener('click', () => {
    switchMap(res.geometry.lat, res.geometry.lng);
  });


  // create and style the div containing the landmark images
  const landMarks = document.querySelector('.land-mark');
  landMarks.innerHTML = '';

  // iterate over the array of landmark images
  // and append each of them to the div above
  pixaImages.forEach((pixaImage) => {
    const eachLandMark = document.createElement('div');

    eachLandMark.style.backgroundImage = `url(${pixaImage.largeImageURL})`;
    eachLandMark.addEventListener('click', () => {
      displayLarge(pixaImage, pixaImages);
    });

    landMarks.appendChild(eachLandMark);
  });


  notFound.style.display = 'none';
};


// displays error when a search fails
const errorPage = (value) => {
  result.style.display = 'none';
  placeTitle.style.display = 'none';
  notFound.style.display = 'block';
  notFound.classList.add('not-found');
  notFound.innerHTML = `<h1>${value} Not Found!</h1>`;
};


// function for making the AJAX requests to the APIs for
// fetching the weather conditions, coordinates and
// landmark images of a place
const placeSearch = async (value) => {
  // creates the spinner effect
  main.style.display = 'none';
  footer.style.display = 'none';
  loader.style.display = 'block';
  loader.classList.add('loader');
  message.innerHTML = '';

  try {
    const cagedataApi = 'https://api.opencagedata.com/geocode/v1/json?';
    const cagedataKey = '25538790e2f94fa1be1032d20c21e732';
    const cagedataParams = '&language=en&pretty=1&no_annotations=1';

    const weathermapApi = 'http://api.openweathermap.org/data/2.5/weather?';
    const weathermapKey = '1e32355a85c5965bc24316c27175c6a7';

    const pixabayApi = 'https://pixabay.com/api/?';
    const pixbayKey = '14281350-22ea61d1a8aab6d3cae824171';
    const pixabayParams = '&image_type=photo&category=places,buildings,travel';

    const [cagedata, weathermap, pixabay] = await Promise.all([
      fetch(`${cagedataApi}q=${value}&key=${cagedataKey}${cagedataParams}`),
      fetch(`${weathermapApi}q=${value}&APPID=${weathermapKey}`),
      fetch(`${pixabayApi}key=${pixbayKey}&q=${value}${pixabayParams}`),
    ]);

    const [cagedataJson, weathermapJson, pixabayJson] = await Promise.all([
      cagedata.json(), weathermap.json(), pixabay.json(),
    ]);

    // removes spinner after request
    main.style.display = 'block';
    footer.style.display = 'block';
    loader.style.display = 'none';
    input.value = value;

    // displays result page on success
    resultPage(cagedataJson.results[0], weathermapJson, pixabayJson.hits);
  } catch (err) {
    // displays error page on failure
    input.value = value;
    errorPage(value);
  }
};


export { input, clearIcon, placeSearch };
