// initialize required element for result page
const notFound = document.createElement('h1');
const placeTitle = document.createElement('h1');
const result = document.createElement('div');
const largeImage = document.createElement('div');
const loader = document.createElement('div');

const input = document.querySelector('.search-field');
const submit = document.querySelector('.search-button');


function changeTemp(temp){
    const tempItem = document.querySelector('.temp-item');
    const tempButton = document.querySelector('#temp-button');
    if(!localStorage.getItem('tempUnit')){
        localStorage.setItem('tempUnit', 'C');
        let tempValue = (temp - 273.15).toFixed(2);
        localStorage.setItem('tempValue', tempValue);

        let list = `<i class="fa fa-circle condition-symbol"></i>
        <span class="condition-name">Temperature:</span>
        <span class="condition-value">${localStorage.getItem('tempValue')}
        <span class="condition-unit">
        &#176;C</span></span>`;

        let buttonChild = `<i class="fa fa-thermometer thermo"></i>
        <span class="thermo-span">Convert &#176C to &#176F</span>`;

        tempItem.innerHTML = list;
        tempButton.innerHTML = buttonChild
    } else if(localStorage.getItem('tempUnit') === 'F'){
        let tempValue = ((localStorage.getItem('tempValue') - 32) * (5/9)).toFixed(2);
        localStorage.setItem('tempUnit', 'C');
        localStorage.setItem('tempValue', tempValue);

        let list = `<i class="fa fa-circle condition-symbol"></i>
        <span class="condition-name">Temperature:</span>
        <span class="condition-value">${localStorage.getItem('tempValue')}
        <span class="condition-unit">
        &#176;C</span></span>`;

        let buttonChild = `<i class="fa fa-thermometer thermo"></i>
        <span class="thermo-span">Convert &#176C to &#176F</span>`;

        tempItem.innerHTML = list;
        tempButton.innerHTML = buttonChild
    } else {
        let tempValue = ((localStorage.getItem('tempValue') * (9/5)) + 32).toFixed(2);
        localStorage.setItem('tempUnit', 'F');
        localStorage.setItem('tempValue', tempValue);

        let list = `<i class="fa fa-circle condition-symbol"></i>
        <span class="condition-name">Temperature:</span>
        <span class="condition-value">${localStorage.getItem('tempValue')}
        <span class="condition-unit">
        &#176;F</span></span>`

        let buttonChild = `<i class="fa fa-thermometer thermo"></i>
        <span class="thermo-span">Convert &#176F to &#176C</span>`;

        tempItem.innerHTML = list;
        tempButton.innerHTML = buttonChild

    }

}


function switchMap(lat, lng){
    const switchButton = document.querySelector('#switch-button');
    const mainMap = document.querySelector('.result-map');
    if(localStorage.getItem('mapType') === 'map' || !localStorage.getItem('mapType')){
        localStorage.setItem('mapType', 'hyb');
        localStorage.setItem('mapNext', 'Map');

        let url = `https://www.mapquestapi.com/staticmap/v5/map?key=IvNAwSUNmSxFBKN37pVED3RuRscWNnGk&locations=${lat},${lng}&zoom=14&defaultMarker=marker-end&type=hyb`;

        mainMap.setAttribute('style', `background-image: url('${url}');`);
        switchButton.innerHTML = `<i class="fa fa-toggle-off thermo"></i>
        <span class="thermo-span">Switch to Map View</span>`;

    } else {
        localStorage.setItem('mapType', 'map');
        localStorage.setItem('mapNext', 'Earth');

        let url = `https://www.mapquestapi.com/staticmap/v5/map?key=IvNAwSUNmSxFBKN37pVED3RuRscWNnGk&locations=${lat},${lng}&zoom=14&defaultMarker=marker-end&type=map`;

        mainMap.setAttribute('style', `background-image: url('${url}');`);
        switchButton.innerHTML = `<i class="fa fa-toggle-on thermo"></i>
        <span class="thermo-span">Switch to Earth View</span>`;

    }
}



// runs when user is typing
input.addEventListener('input', () => {
    if(input.value.trim()){    
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("search", input.value.trim());
        const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);

        submit.removeAttribute('disabled');
        submit.classList.remove('no-text');
    } else {
        submit.setAttribute('disabled', 'disabled');
        submit.classList.add('no-text');
    }
})

// display large landmark image
function displayLarge(image, allImages){

    largeImage.classList.add('large-image');

    largeImage.innerHTML = `<div class="back">
    <i id="back-icon" class="fa fa-chevron-circle-left image-next"></i></div>
    <div class="image" style="background-image:url(${image})"></div>
    <div class="next"><i class="top fa fa-times image-next" onclick="removeLarge();"></i>
    <i id="next-icon" class="bottom fa fa-chevron-circle-right image-next"></i></div>`
    body.appendChild(largeImage);

    const backIcon = document.querySelector('#back-icon');
    backIcon.addEventListener('click', () =>{
        backLarge(image, allImages);
    })

    const nextIcon = document.querySelector('#next-icon');
    nextIcon.addEventListener('click', () =>{
        nextLarge(image, allImages);
    })

    body.removeChild(main);
    body.removeChild(footer);            
}


// cancel out large image viewing
function removeLarge(){ 
    body.appendChild(main);
    body.removeChild(largeImage);;
    body.appendChild(footer);
}


// shows the next large image
function nextLarge(image, allImages){
    console.log('....', allImages);
    const index = allImages.indexOf(image);
    const newIndex = (index + 1) > (allImages.length - 1) ? 0 : (index + 1);

    displayLarge(allImages[newIndex], allImages);
}


// shows the previous large image
function backLarge(image, allImages){
    const index = allImages.indexOf(image);

    let newIndex = '';
    if(index === 0){
        newIndex = allImages.length-1;
    } else {
        newIndex = index-1;
    }

    displayLarge(allImages[newIndex], allImages);
}


// manipulates the DOM for the result page
function secondResultPage(res, weatherData, pixaImages){

    placeTitle.innerHTML = `<span class="left">
    Postal Code: ${res.components.postcode ? res.components.postcode:'Not Available'}
    </span"><span class="right">Location: ${res.formatted}</span>`;
    
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
    <i class="fa fa-facebook thermo"></i>
    <span class="thermo-span">Share to Facebook</span>
    </button></div>

    <div class="switch-feature" onclick="switchMap('${res.geometry.lat}', '${res.geometry.lng}')">
    <button id="switch-button" type="button">
    <i class="fa ${localStorage.getItem('mapNext') === 'Earth' ? 
    'fa-toggle-on' : 'fa-toggle-off'} thermo"></i>
    <span class="thermo-span">Switch to ${localStorage.getItem('mapNext')  || 'Earth'}  View</span>
    </button></div>

    </div>

    <div class="result-map" style="background-image: 
    url('https://www.mapquestapi.com/staticmap/v5/map?key=IvNAwSUNmSxFBKN37pVED3RuRscWNnGk&locations=${res.geometry.lat},${res.geometry.lng}&zoom=14&defaultMarker=marker-end&type=${localStorage.getItem('mapType')  || 'map'}');">
    </div>`

    const landMark = document.querySelector('.land-mark');
    landMark.innerHTML = '';

    main.appendChild(landMark);

    // display landmark images of the search to the result page
    pixaImages.forEach((img) => {
        const image = document.createElement('div');

        image.style.backgroundImage = `url(${img})`;
        image.addEventListener('click', () => {
            displayLarge(img, pixaImages);
        });

        landMark.appendChild(image);
    });
    

};


async function resultSearch(value){
    try{
        const cagedata = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${value}&key=25538790e2f94fa1be1032d20c21e732&language=en&pretty=1&no_annotations=1`);
        const weathermap = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=1e32355a85c5965bc24316c27175c6a7`);
        const pixabay = await fetch(`https://pixabay.com/api/?key=14281350-22ea61d1a8aab6d3cae824171&q=${value}&image_type=photo&category=places,buildings,travel`);
        
        const cagedataJson = await cagedata.json();
        const weathermapJson = await weathermap.json();
        const pixabayJson = await pixabay.json();

        const onlyImages = pixabayJson.hits.map((hit) => hit.largeImageURL);

        if(cagedataJson.results[0] && weathermapJson){        
            secondResultPage(cagedataJson.results[0], weathermapJson, onlyImages); 
        } else {
            errorPage(value); 
        }
    } catch(err){
        errorPage(value);
    }
    
}


// manipulates the DOM for the result page
function resultPage(res, weatherData, pixaImages){
    
    section.removeChild(intro);
    main.removeChild(features);

    section.classList.add('section2');

    form.classList.add('result-field');
    form.addEventListener('submit', (e)=> {
        e.preventDefault();
        resultSearch(e.target.search.value);
    });

    input.classList.add('search-field2', 'remove-outline');
    submit.classList.add('search-button2');

    placeTitle.classList.add('place-title');
    placeTitle.innerHTML = `<span class="left">
    Postal Code: ${res.components.postcode ? res.components.postcode:'Not Available'}
    </span"><span class="right">Location: ${res.formatted}</span>`;
    
    main.appendChild(placeTitle);

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
    <i class="fa fa-facebook thermo"></i>
    <span class="thermo-span">Share to Facebook</span>
    </button></div>

    <div class="switch-feature" onclick="switchMap('${res.geometry.lat}', '${res.geometry.lng}')">
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

    const landMark = document.createElement('div');
    landMark.classList.add('land-mark');
    main.appendChild(landMark);    


    // display landmark images of the search to the result page
    pixaImages.forEach((img) => {
        const image = document.createElement('div');

        image.style.backgroundImage = `url(${img})`;
        image.addEventListener('click', () => {
            displayLarge(img, pixaImages);
        });

        landMark.appendChild(image);
    });
    

};


function errorPage(value){ 
    section.classList.add('section2');

    form.classList.add('result-field');
    input.classList.add('search-field2', 'remove-outline');
    submit.classList.add('search-button2');

    notFound.classList.add('not-found');
    notFound.textContent = `${value} Not Found!`;
    result.appendChild(notFound);
    main.appendChild(result);
}


// runs when submit the search field
async function placeSearch(value){    
    loader.classList.add('loader');
    body.removeChild(main)
    body.removeChild(footer);
    body.appendChild(loader);

    try{
        const cagedata = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${value}&key=25538790e2f94fa1be1032d20c21e732&language=en&pretty=1&no_annotations=1`);
        const weathermap = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=1e32355a85c5965bc24316c27175c6a7`);
        const pixabay = await fetch(`https://pixabay.com/api/?key=14281350-22ea61d1a8aab6d3cae824171&q=${value}&image_type=photo&category=places,buildings,travel`);
        
        const cagedataJson = await cagedata.json();
        const weathermapJson = await weathermap.json();
        const pixabayJson = await pixabay.json();

        console.log('weather conditions', cagedataJson, weathermapJson, pixabayJson.hits);

        const onlyImages = pixabayJson.hits.map((hit) => hit.largeImageURL);

        console.log('onlyImages', onlyImages);

        body.removeChild(loader);
        body.appendChild(main)
        body.appendChild(footer);
        input.value = value;
        if(cagedataJson.results[0] && weathermapJson){        
            resultPage(cagedataJson.results[0], weathermapJson, onlyImages); 
        } else {
            errorPage(value); 
        }
    } catch(err){
        errorPage(value);
    }
    
};


// runs when submit the search field
form.addEventListener('submit', (e) => {
    e.preventDefault();
    placeSearch(input.value.trim());
});



// loads when the document is loaded
window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    if(search){
        placeSearch(search);
    } else {
        if(!input.value.trim()){
        submit.setAttribute('disabled', 'disabled');
        submit.classList.add('no-text');
    } else {
        submit.removeAttribute('disabled');
        submit.classList.remove('no-text');
    }   
    }

});
