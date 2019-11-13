const featureList = [
    {
        fa: 'fa-search',
        heading: 'Quick comprehensive search',
        paragraph: `It is a long established fact that 
        a reader will be distracted by the readable content
        of a page when looking at its layout. The point of 
        using Lorem Ipsum is that it has a more-or-less 
        normal distribution of letters, as opposed to using`
    },
    {
        fa: 'fa-cloud',
        heading: 'View weather conditions',
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
        heading: 'View postal code',
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

centering.setAttribute('id', 'centering');

headerFirstSpan.textContent = 'Geo';
headerFirstSpan.classList.add('geo');
headerSecSpan.textContent = 'Search';
headerHeading.appendChild(headerFirstSpan);
headerHeading.appendChild(headerSecSpan);
headerHeading.setAttribute('id', 'logo');
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
introParagraph.textContent = `See and implore interesting
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
button.textContent = 'Search';
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



const resultFeature = document.createElement('div');
const resultMap = document.createElement('div');
const result = document.createElement('div');
const mapMarker = document.createElement('i');
const cancel = document.createElement('i');


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
        resultMap.classList.add('result-map');
        resultMap.appendChild(mapMarker);
        result.appendChild(resultFeature);
        result.appendChild(resultMap)
        //result.appendChild(notFound);
    }
})
