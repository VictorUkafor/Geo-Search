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
const landMark = document.createElement('div');
const placeTitle = document.createElement('h1');
const largeImage = document.createElement('div');


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


cancel.classList.add('fa', 'fa-times-circle', 'cancel');
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
placeTitle.classList.add('place-title');
placeTitle.innerHTML = `<span class="left">Postal Code: 123401
</span"><span class="right">Lagos, Nigeria</span>`;



mapMarker.classList.add('fa', 'fa-map-marker', 'map-marker');
resultFeature.classList.add('result-features');
weather.classList.add('weather-feature');
weather.innerHTML = `<i class="fa fa-cloud weather-cloud"></i>`;

conditionDiv.classList.add('condition-box');


temp.classList.add('temp-feature');
share.classList.add('share-feature');
resultMap.classList.add('result-map');
resultMap.style.backgroundImage = `url('img/map.jpg')`;
tempButton.setAttribute('id', 'temp-button');
tempButton.setAttribute('type', 'button');
tempButton.innerHTML =  `<i class="fa fa-thermometer thermo"></i>
<span class="thermo-span">Convert &#176;C to &#176;F</span>`;
       
shareButton.setAttribute('id', 'share-button');
shareButton.setAttribute('type', 'button');
shareButton.innerHTML = 
`<i class="fa fa-facebook thermo"></i>
<span class="thermo-span">Share to Facebook</span>`;

landMark.classList.add('land-mark');
largeImage.classList.add('large-image');



module.exports = {
    index, centering, header, headerHeading, headerFirstSpan,
    headerSecSpan, section, intro, introHeading, introParagraph,
    introFirstSpan, introSecSpan, firstSubSpan, secSubSpan, form,
    formDiv, input, button, features, footer, notFound, resultFeature,
    resultMap, result, mapMarker, cancel, weather, temp, share, logoLink,
    tempButton ,shareButton, conditionDiv, conditionList, landMark, 
    placeTitle,largeImage
}