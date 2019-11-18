// initialize required element for result page
//const notFound = document.createElement('h1');
const placeTitle = document.createElement('h1');
const result = document.createElement('div');
const landMark = document.createElement('div');
const largeImage = document.createElement('div');

const input = document.querySelector('.search-field');
const submit = document.querySelector('.search-button');

// loads when the document is loaded
document.addEventListener('load', () => {
    if(!input.value.trim()){
        submit.setAttribute('disabled', 'disabled');
        submit.classList.add('no-text');
    } else {
        submit.removeAttribute('disabled');
        submit.classList.remove('no-text');
    }
});

// runs when user is typing
input.addEventListener('input', () => {
    if(input.value.trim()){
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
function resultPage(){
    section.removeChild(intro);
    section.removeChild(features);

    header.innerHTML = `<h1 id="logo" class="logo2">
    <a href="index.html"><span class="geo">Geo</span>
    <span>Search</span></a></h1>`;

    section.classList.add('section2');

    form.classList.add('result-field');
    form.innerHTML = `<div class="search">
    <input type="search" name="search" id="field-search" 
    class="search-field2 remove-outline"/>
    <button type="submit" class="search-button2 
    remove-outline">Explore</button></div>`;

    placeTitle.classList.add('place-title');
    placeTitle.innerHTML = `<span class="left">Postal Code: 123401
    </span"><span class="right">Lagos, Nigeria</span>`;
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
    <div class="result-map" style="background-image: url('img/map.jpg');">
    <i class="fa fa-map-marker map-marker"></i></div>`
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
    

        // notFound.classList.add('not-found');
        // notFound.textContent = `${input.value} Not Found!`;
        //result.appendChild(notFound);

};


// runs when submit the search field
form.addEventListener('submit', (e) => {
    e.preventDefault();
    resultPage();
});