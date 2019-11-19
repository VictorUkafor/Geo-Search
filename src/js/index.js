// initialize required element for result page
const notFound = document.createElement('h1');
const placeTitle = document.createElement('h1');
const result = document.createElement('div');
const landMark = document.createElement('div');
const largeImage = document.createElement('div');
const loader = document.createElement('div');

const input = document.querySelector('.search-field');
const submit = document.querySelector('.search-button');


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
function displayLarge(image){
    largeImage.classList.add('large-image');

    largeImage.innerHTML = `<div class="back">
    <i class="fa fa-chevron-circle-left image-next" onclick="backLarge('${image}');"></i></div>
    <div class="image" style="background-image:url('${image}')"></div>
    <div class="next"><i class="top fa fa-times image-next" onclick="removeLarge();"></i>
    <i class="bottom fa fa-chevron-circle-right image-next" onclick="nextLarge('${image}');"></i></div>`
    body.appendChild(largeImage);

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
function nextLarge(image){
    const index = images.indexOf(image);
    const newIndex = (index + 1) > (images.length - 1) ? 0 : (index + 1);

    displayLarge(images[newIndex]);
}


// shows the previous large image
function backLarge(image){
    const index = images.indexOf(image);

    let newIndex = '';
    if(index === 0){
        newIndex = images.length-1;
    } else {
        newIndex = index-1;
    }

    displayLarge(images[newIndex]);
}


// manipulates the DOM for the result page
function resultPage(res){
    console.log('ffffffff', res);
    section.removeChild(intro);
    main.removeChild(features);

    header.innerHTML = `<h1 id="logo" class="logo2">
    <a href="index.html"><span class="geo">Geo</span>
    Search</a></h1>`;

    section.classList.add('section2');

    form.classList.add('result-field');
    form.innerHTML = `<div class="search">
    <input type="search" name="search" id="field-search" 
    class="search-field2 remove-outline"/>
    <button type="submit" class="search-button2 
    remove-outline">Explore</button></div>`;

    placeTitle.classList.add('place-title');
    placeTitle.innerHTML = `<span class="left">
    Postal Code: ${res.components.postcode ? res.components.postcode:'Not Available'}
    </span"><span class="right">Location: ${res.formatted}</span>`;
    
    main.appendChild(placeTitle);

    result.classList.add('result');
    result.innerHTML = `<div class="result-features">
    <div class="weather-feature">
    <i class="fa fa-cloud weather-cloud"></i>
    <div class="condition-box"><ul></ul></div></div>
    <div class="temp-feature"><button id="temp-button" type="button">
    <i class="fa fa-thermometer thermo"></i>
    <span class="thermo-span">Convert &#176C to &#176F</span></button></div>
    <div class="share-feature"><button id="share-button" type="button">
    <i class="fa fa-facebook thermo"></i>
    <span class="thermo-span">Share to Facebook</span>
    </button></div></div>
    <div class="result-map" style="background-image: 
    url('https://www.mapquestapi.com/staticmap/v5/map?key=IvNAwSUNmSxFBKN37pVED3RuRscWNnGk&locations=${res.geometry.lat},${res.geometry.lng}&zoom=14&defaultMarker=marker-end&type=map');">`
    main.appendChild(result);

    landMark.classList.add('land-mark');
    main.appendChild(landMark);  
         
    // populates the result page with the weather conditions
    // of the search result
    const conditionBox = document.querySelector('.condition-box');
    conditions.forEach((each) => {
        const item = document.createElement('li');
        
        item.innerHTML = 
        `<i class="fa fa-circle condition-symbol"></i>
        <span class="condition-name">${each.name}:</span>
        <span class="condition-value">${each.value}
        <span class="condition-unit">${each.unit}</span></span>`;
        
        // append to the firstChild(ul) of the 
        // of the condition box div
        conditionBox.firstChild.appendChild(item);
    });        


    // display landmark images of the search to the result page
    images.forEach((img) => {
        const image = document.createElement('div');

        image.style.backgroundImage = `url(${img})`;
        image.addEventListener('click', () => {
            displayLarge(img);
        });

        landMark.appendChild(image);
    });
    



};


function errorPage(value){ 
    header.innerHTML = `<h1 id="logo" class="logo2">
    <a href="index.html"><span class="geo">Geo</span>
    <span>Search</span></a></h1>`;

    section.classList.add('section2');

    form.classList.add('result-field');
    form.innerHTML = `<div class="search">
    <input autocomplete="off" type="search" 
    name="search" id="field-search" 
    class="search-field2 remove-outline"/>
    <input type="submit" class="search-button 
    search-button2" value="Explore"/></div>`;

    notFound.classList.add('not-found');
    notFound.textContent = `${value} Not Found!`;
    result.appendChild(notFound);
    main.appendChild(result);
}


// runs when submit the search field
async function placeSearch(value){ 
    body.appendChild(loader);   
    body.removeChild(main);
    body.removeChild(footer);
    loader.classList.add('loader');
    try{
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q='${value}'&key=25538790e2f94fa1be1032d20c21e732&language=en&pretty=1&no_annotations=1`);
        const data = await response.json();

        if(data.results[0]){        
            body.removeChild(loader);
            body.appendChild(main);
            body.appendChild(footer)
            resultPage(data.results[0]); 
        } else {
            body.removeChild(loader);
            body.appendChild(main);
            section.removeChild(intro);
            main.removeChild(features);
            body.appendChild(footer)
            errorPage(value); 
        }
        console.log('response', data.results[0]);
    } catch(err){
        body.removeChild(loader);
        body.appendChild(main);
        section.removeChild(intro);
        main.removeChild(features);
        body.appendChild(footer)
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