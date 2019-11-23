// initialize required element for result page
const notFound = document.createElement('div');
const placeTitle = document.createElement('h1');
const result = document.createElement('div');
const largeImage = document.createElement('div');
const loader = document.createElement('div');

const input = document.querySelector('.search-field');
const messageDiv = document.querySelector('.message');



// function for converting temperature from Celsius to Fahrenheit
// or vice versa. The default unit from is Kelvin
const changeTemp = (temp) => {
    const tempItem = document.querySelector('.temp-item');
    const tempButton = document.querySelector('#temp-button');

    // convert Kelvin(initial unit to Celsius) and saves to
    // localStorage. Formula: C = K - 273.15
    if(!localStorage.getItem('tempUnit')){
        localStorage.setItem('tempUnit', 'C');
        const tempValue = (temp - 273.15).toFixed(2);
        localStorage.setItem('tempValue', tempValue);

        // render changes to the DOM
        tempItem.innerHTML = `<i class="fa fa-circle condition-symbol"></i>
        <span class="condition-name">Temperature:</span>
        <span class="condition-value">${localStorage.getItem('tempValue')}
        <span class="condition-unit">
        &#176;C</span></span>`;

        tempButton.innerHTML = `<i class="fa fa-thermometer thermo"></i>
        <span class="thermo-span">Convert &#176C to &#176F</span>`;

        // convert Fahrenheit to Celsius and saves to
        // localStorage. Formula: C = (F - 32) * 5/9
    } else if (localStorage.getItem('tempUnit') === 'F'){
        const tempValue = ((localStorage.getItem('tempValue') - 32) * (5/9)).toFixed(2);
        localStorage.setItem('tempUnit', 'C');
        localStorage.setItem('tempValue', tempValue);

        // render changes to DOM
        tempItem.innerHTML = `<i class="fa fa-circle condition-symbol"></i>
        <span class="condition-name">Temperature:</span>
        <span class="condition-value">${localStorage.getItem('tempValue')}
        <span class="condition-unit">
        &#176;C</span></span>`;

        tempButton.innerHTML = `<i class="fa fa-thermometer thermo"></i>
        <span class="thermo-span">Convert &#176C to &#176F</span>`;

        // convert Celsius to Fahrenheit and saves to
        // localStorage. Formula: F = (F * 9/5) + 32
    } else {
        const tempValue = ((localStorage.getItem('tempValue') * (9/5)) + 32).toFixed(2);
        localStorage.setItem('tempUnit', 'F');
        localStorage.setItem('tempValue', tempValue);

        // render changes to the DOM
        tempItem.innerHTML = `<i class="fa fa-circle condition-symbol"></i>
        <span class="condition-name">Temperature:</span>
        <span class="condition-value">${localStorage.getItem('tempValue')}
        <span class="condition-unit">
        &#176;F</span></span>`

        tempButton.innerHTML = `<i class="fa fa-thermometer thermo"></i>
        <span class="thermo-span">Convert &#176F to &#176C</span>`;
    }

}


// function for switching between map view and earth view of the 
// map. Accepts latitude and longitude of the location
const switchMap = (lat, lng) => {
    const switchButton = document.querySelector('#switch-button');
    const mainMap = document.querySelector('.result-map');

    // changing the map view to earth view. Set map to earth view when localstorage
    // is destroyed.
    if(localStorage.getItem('mapType') === 'map' || !localStorage.getItem('mapType')){
        localStorage.setItem('mapType', 'hyb');
        localStorage.setItem('mapNext', 'Map');

        const url = `https://www.mapquestapi.com/staticmap/v5/map?key=IvNAwSUNmSxFBKN37pVED3RuRscWNnGk&locations=${lat},${lng}&zoom=14&defaultMarker=marker-end&type=hyb`;

        // render changes to DOM
        mainMap.setAttribute('style', `background-image: url('${url}');`);
        switchButton.innerHTML = `<i class="fa fa-toggle-off thermo"></i>
        <span class="thermo-span">Switch to Map View</span>`;

        // changes earth view to map view
    } else {
        localStorage.setItem('mapType', 'map');
        localStorage.setItem('mapNext', 'Earth');

        const url = `https://www.mapquestapi.com/staticmap/v5/map?key=IvNAwSUNmSxFBKN37pVED3RuRscWNnGk&locations=${lat},${lng}&zoom=14&defaultMarker=marker-end&type=map`;

        // render changes to DOM
        mainMap.setAttribute('style', `background-image: url('${url}');`);
        switchButton.innerHTML = `<i class="fa fa-toggle-on thermo"></i>
        <span class="thermo-span">Switch to Earth View</span>`;
    }
}


// display landmark image in large size. Accept a single image(image)
// to be enlarge and the entire array of the images found
const displayLarge = (image, allImages) => {

    // add styles and markup to the div containing
    // the image. Also appends the image to DOM
    largeImage.classList.add('large-image');
    largeImage.innerHTML = `<div class="back">
    <i id="back-icon" class="fa fa-chevron-circle-left image-next"></i></div>
    <div class="image" style="background-image:url(${image})"></div>
    <div class="next"><i class="top fa fa-times image-next" onclick="removeLarge();"></i>
    <i id="next-icon" class="bottom fa fa-chevron-circle-right image-next"></i></div>`
    body.appendChild(largeImage);

    // icon for previous image of the slide
    const backIcon = document.querySelector('#back-icon');
    backIcon.addEventListener('click', () =>{
        backLarge(image, allImages);
    })

    // icon for next image of the slide
    const nextIcon = document.querySelector('#next-icon');
    nextIcon.addEventListener('click', () =>{
        nextLarge(image, allImages);
    })

    // remove every other markup to create a slide format
    body.removeChild(main);
    body.removeChild(footer);            
}


// cancel out large image viewing
const removeLarge = () => { 
    body.appendChild(main);
    body.removeChild(largeImage);;
    body.appendChild(footer);
}


// shows the next large image
const nextLarge = (image, allImages) => {
    const index = allImages.indexOf(image);
    const newIndex = (index >= (allImages.length - 1)) ?
     0 : (index + 1);

    displayLarge(allImages[newIndex], allImages);
}


// shows the previous large image
const backLarge = (image, allImages) => {
    const index = allImages.indexOf(image);
    const newIndex = (index === 0) ? 
    allImages.length - 1 : index - 1;

    displayLarge(allImages[newIndex], allImages);
}


// displays the result of the search to the 
// page when search request is successfull
const resultPage = (res, weatherData, pixaImages) => {
    main.removeChild(section);
    main.removeChild(features);

    // sets the postcode and title of the search
    placeTitle.classList.add('place-title');
    placeTitle.innerHTML = `<span>Postal Code: 
    ${res.components.postcode ? res.components.postcode:'Not Available'}
    </span"><span class="right">Location: ${res.formatted}</span>`;
    main.appendChild(placeTitle);

    // attaches the weather conditons of the place 
    // onto the result page
    result.classList.add('result');
    result.innerHTML = `<div class="result-features">
    <div class="weather-feature">
    <div style="background-image: url('http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png');" class="weather-cloud"></div>

    <div class="condition-box">
    <p class="cloud-description">${weatherData.weather[0].description}</p>
    <ul>

    <li class="temp-item"><i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Temperature:</span>
    <span class="condition-value">
    ${localStorage.getItem('tempValue') || weatherData.main.temp}
    <span class="condition-unit">&#176;${localStorage.getItem('tempUnit') || 'F'}</span></span></li>

    <li><i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Pressure:</span>
    <span class="condition-value">${weatherData.main.pressure}
    <span class="condition-unit">mb</span></span></li>

    <li><i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Visibility:</span>
    <span class="condition-value">${weatherData.visibility || ''}
    <span class="condition-unit">${weatherData.visibility ? 'm':'N/A'}</span></span></li>

    <li><i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Humidity:</span>
    <span class="condition-value">${weatherData.main.humidity}
    <span class="condition-unit">%</span></span></li>

    <li><i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Precipitation:</span>
    <span class="condition-value">${weatherData.precipitation || ''}
    <span class="condition-unit">${weatherData.precipitation ? 'mm':'N/A'}</span></span></li>

    <li><i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Wind Speed:</span>
    <span class="condition-value">${(weatherData.wind.speed * 2.237).toFixed(2)}
    <span class="condition-unit">mi/hr</span></span></li>

    <li><i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Wind Direction:</span>
    <span class="condition-value">${weatherData.wind.deg || ''}
    <span class="condition-unit">${weatherData.wind.deg ? '&#176;':'N/A'}</span></span></li>

    <li><i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Cloud Cover:</span>
    <span class="condition-value">${weatherData.clouds.all || ''}
    <span class="condition-unit">${weatherData.clouds.all ? '':'N/A'}</span></span></li>

    <li><i class="fa fa-circle condition-symbol"></i>
    <span class="condition-name">Timezone:</span>
    <span class="condition-value">${Math.sign((weatherData.timezone/(60*60))) 
    === 1 ? '+':''}${(weatherData.timezone/(60*60))}
    <span class="condition-unit">GMT</span></span></li>

    </ul></div></div>

    <div class="temp-feature">
    <button id="temp-button" type="button" 
    onclick="changeTemp('${weatherData.main.temp}');">
    <i class="fa fa-thermometer thermo"></i>
    <span class="thermo-span">Convert 
    ${localStorage.getItem('tempUnit') === 'C' ? '&#176C to &#176F' : '&#176F to &#176C'}
    </span></button></div>

    <div class="share-feature">
    <button id="share-button" type="button">
    <a href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}" 
    target="_blank"><i class="fa fa-facebook thermo"></i>
    <span class="thermo-span">Share to Facebook</span></a>
    </button></div>

    <div class="switch-feature" 
    onclick="switchMap('${res.geometry.lat}', '${res.geometry.lng}')">
    <button id="switch-button" type="button">
    <i class="fa ${localStorage.getItem('mapNext') === 'Earth' ? 
    'fa-toggle-on' : 'fa-toggle-off'} thermo"></i>
    <span class="thermo-span">Switch to ${localStorage.getItem('mapNext')  || 'Earth'}  View</span>
    </button></div>

    </div>

    <div class="result-map" style="background-image: 
    url('https://www.mapquestapi.com/staticmap/v5/map?key=IvNAwSUNmSxFBKN37pVED3RuRscWNnGk&locations=${res.geometry.lat},${res.geometry.lng}&zoom=14&defaultMarker=marker-end&type=${localStorage.getItem('mapType')  || 'map'}');">
    </div>`
    main.appendChild(result);

    // create and style the div containing the landmark images
    const landMark = document.createElement('div');
    landMark.classList.add('land-mark');
    main.appendChild(landMark);    


    // iterate over the array of landmark images 
    // and append each of them to the div above
    pixaImages.forEach((img) => {
        const image = document.createElement('div');

        image.style.backgroundImage = `url(${img})`;
        image.addEventListener('click', () => {
            displayLarge(img, pixaImages);
        });

        landMark.appendChild(image);
    });
    

};


// displays error when a search fails
const errorPage = (value) => { 
    notFound.classList.add('not-found');
    notFound.innerHTML = `<h1>${value} Not Found!</h1>`;
    main.appendChild(notFound);
}


// function for making the AJAX requests to the APIs for
// fetching the weather conditions, coordinates and 
// landmark images of a place
const placeSearch = async(value) => {   
    
    // creates the spinner effect
    loader.classList.add('loader');
    body.appendChild(loader);
    body.removeChild(main);
    body.removeChild(footer);
    messageDiv.innerHTML = '';

    try{
        const cagedata = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${value}&key=25538790e2f94fa1be1032d20c21e732&language=en&pretty=1&no_annotations=1`);
        const weathermap = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=1e32355a85c5965bc24316c27175c6a7`);
        const pixabay = await fetch(`https://pixabay.com/api/?key=14281350-22ea61d1a8aab6d3cae824171&q=${value}&image_type=photo&category=places,buildings,travel`);
        
        const cagedataJson = await cagedata.json();
        const weathermapJson = await weathermap.json();
        const pixabayJson = await pixabay.json();

        const onlyImages = pixabayJson.hits.map((hit) => hit.largeImageURL);

        // removes spinner after request
        body.removeChild(loader);
        body.appendChild(main)
        body.appendChild(footer);
        input.value = value;

        // displays result page on success
        resultPage(cagedataJson.results[0], weathermapJson, onlyImages);
    } catch(err){

        // displays error page on failure
        input.value = value;
        errorPage(value);
    }
    
};

