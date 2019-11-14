const featureList = [
    {
        fa: 'fa-search',
        heading: 'Quick search',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-cloud',
        heading: 'local weather conditions',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-thermometer',
        heading: 'Temperature conversion',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-facebook-square',
        heading: 'Share to Facebook',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-map-marker',
        heading: 'Postal code',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-font',
        heading: 'Autocomplete feature',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
];


const conditions = [
    {
        name: 'Temperature',
        value: '37',
        unit: '&#176;C',
    },
    {
        name: 'Cloud Cover',
        value: '1',
        unit: ''
    },
    {
        name: 'Pressure',
        value: '37',
        unit: 'mb',
    },
    {
        name: 'Precipitation',
        value: '10',
        unit: 'inch',
    }, 
    {
        name: 'Visibility',
        value: '8',
        unit: 'mi',
    },
    {
        name: 'Humidity',
        value: '1',
        unit: '',
    },  
    {
        name: 'Wind Speed',
        value: '6',
        unit: 'mi/hr',
    }, 
];


const index = document.querySelector('#index');
const centering = document.createElement('div');
const header = document.createElement('header');
const headerHeading = document.createElement('h1');
const headerFirstSpan = document.createElement('span');
const headerSecSpan = document.createElement('span');
const section = document.createElement('section');
const intro = document.createElement('div');
const introHeading = document.createElement('h1');
const introParagraph = document.createElement('p');
const introFirstSpan = document.createElement('span');
const introSecSpan = document.createElement('span');
const firstSubSpan = document.createElement('span');
const secSubSpan = document.createElement('span');
const form = document.createElement('form');
const formDiv = document.createElement('div');
const input = document.createElement('input');
const button = document.createElement('button');
const features = document.createElement('div');
const footer = document.createElement('footer');
const notFound = document.createElement('h1');
const resultFeature = document.createElement('div');
const resultMap = document.createElement('div');
const result = document.createElement('div');
const mapMarker = document.createElement('i');
const cancel = document.createElement('i');
const weather = document.createElement('div');
const temp = document.createElement('div');
const share = document.createElement('div');
const logoLink = document.createElement('a');
const tempButton = document.createElement('button');
const shareButton = document.createElement('button');
const conditionDiv = document.createElement('div');
const conditionList = document.createElement('ul');

centering.setAttribute('id', 'centering');

logoLink.setAttribute('href', 'index.html');
headerFirstSpan.textContent = 'Geo';
headerFirstSpan.classList.add('geo');
headerSecSpan.textContent = 'Search';
logoLink.appendChild(headerFirstSpan);
logoLink.appendChild(headerSecSpan);
headerHeading.setAttribute('id', 'logo');
headerHeading.appendChild(logoLink);
header.appendChild(headerHeading);

introFirstSpan.textContent = 'Welcome to ';
introHeading.appendChild(introFirstSpan);

firstSubSpan.textContent = 'Geo';
firstSubSpan.classList.add('geo');
secSubSpan.textContent = 'Search';
introSecSpan.classList.add('bg-logo');
introSecSpan.appendChild(firstSubSpan);
introSecSpan.appendChild(secSubSpan);

introHeading.appendChild(introSecSpan);
introParagraph.textContent = `Search and explore interesting
 places around the globe. Share your experience`;

intro.classList.add('intro');
intro.appendChild(introHeading);
intro.appendChild(introParagraph);

formDiv.classList.add('search');
input.setAttribute('type', 'text');
input.setAttribute('name', 'search');
input.setAttribute('id', 'field-search');
input.classList.add('search-field');
button.setAttribute('type', 'submit');
button.textContent = 'Explore';
button.classList.add('search-button');
formDiv.appendChild(input);
formDiv.appendChild(button);
form.appendChild(formDiv);

features.classList.add('features');

featureList.forEach((item) => {
    const feature = document.createElement('div'); 
    const featHeading = document.createElement('h3');
    const featParagraph = document.createElement('p');
    const paragraphContent = document.createElement('span');
    const icon = document.createElement('i');

    icon.classList.add('fa', item.fa, 'fa-img');
    paragraphContent.textContent = item.heading;
    
    featHeading.appendChild(icon);
    featHeading.appendChild(paragraphContent);    
    
    featParagraph.textContent = item.paragraph;
    
    feature.classList.add('feature');
    feature.appendChild(featHeading);
    feature.appendChild(featParagraph);
    
    features.appendChild(feature);
});

section.classList.add('content');
section.appendChild(intro);
section.appendChild(form);
section.appendChild(features);

centering.appendChild(header);
centering.appendChild(section);

footer.innerHTML = `<p>&copy; Copyright 2019. 
&nbsp; All rights reserved. &nbsp; Designed 
and developed by <a href="https://github.com/VictorUkafor">
Victor Ukafor</a></p>`;

index.appendChild(centering);
index.appendChild(footer);






window.addEventListener('load', () => {
    if(!input.value){
        button.setAttribute('disabled', 'disabled');
        button.classList.add('no-text');
    } else {
        button.removeAttribute('disabled');
        button.classList.remove('no-text');
    }
});


input.addEventListener('input', () => {
    
    if(input.value.trim()){
        button.removeAttribute('disabled');
        button.classList.remove('no-text');
    } else {
        button.setAttribute('disabled', 'disabled');
        button.classList.add('no-text');
    }
    form.removeChild(cancel);
})

cancel.addEventListener('click', () => {
    input.value = '';
    form.removeChild(cancel);
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input.value.trim()){
        cancel.classList.add('fa', 'fa-times-circle', 'cancel');
        form.appendChild(cancel);
        section.removeChild(intro);
        section.removeChild(features);
        form.classList.add('result-field');
        input.classList.remove('search-field');
        input.classList.add('search-field2', 'remove-outline');
        button.classList.remove('search-button');
        button.classList.add('search-button2', 'remove-outline');
        header.firstElementChild.classList.add('logo2');
        notFound.classList.add('not-found');
        notFound.textContent = `${input.value} Not Found!`;
        result.classList.add('result');
        section.classList.add('section2');
        centering.append(result);
        mapMarker.classList.add('fa', 'fa-map-marker', 'map-marker');
        resultFeature.classList.add('result-features');
        weather.classList.add('weather-feature');
        weather.innerHTML = `<i class="fa fa-cloud weather-cloud"></i>`;
        
        conditionDiv.classList.add('condition-box');
        conditionDiv.appendChild(conditionList);
        weather.appendChild(conditionDiv);

        conditions.forEach((cond) => {
            const conditionListItem = document.createElement('li');

            conditionListItem.innerHTML = 
            `<i class="fa fa-circle condition-symbol"></i>
            <span class="condition-name">${cond.name}:</span>
            <span class="condition-value">${cond.value}
            <span class="condition-unit">${cond.unit}</span></span>`;

            conditionList.appendChild(conditionListItem);

        });


        temp.classList.add('temp-feature');
        share.classList.add('share-feature');
        resultMap.classList.add('result-map');
        resultFeature.appendChild(weather);
        resultFeature.appendChild(temp);
        resultFeature.appendChild(share);
        resultMap.appendChild(mapMarker);
        result.appendChild(resultFeature);
        result.appendChild(resultMap)
        tempButton.setAttribute('id', 'temp-button');
        tempButton.setAttribute('type', 'button');
        tempButton.innerHTML =  `<i class="fa fa-thermometer thermo"></i>
        <span class="thermo-span">Convert &#176;C to &#176;F</span>`;
        temp.appendChild(tempButton);        
        shareButton.setAttribute('id', 'share-button');
        shareButton.setAttribute('type', 'button');
        shareButton.innerHTML = 
        `<i class="fa fa-facebook thermo"></i>
        <span class="thermo-span">Share to Facebook</span>`;
        share.appendChild(shareButton);
        //result.appendChild(notFound);
    }
})
