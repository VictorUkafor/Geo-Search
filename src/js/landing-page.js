
// initialize elements for the landing page
const body = document.querySelector('#body');
const main = document.createElement('div');
const header = document.createElement('header');
const section = document.createElement('section');
const intro = document.createElement('div');
const form = document.createElement('form');
const features = document.createElement('div');
const footer = document.createElement('footer');


main.setAttribute('id', 'centering');

header.innerHTML = `<h1 class="logo"><a href="index.html">
<span class="geo">Geo</span><span>Search</span></a></h1>`;
// append header to the main header div
main.appendChild(header);

section.classList.add('content');

intro.classList.add('intro');
intro.innerHTML = `<h1><span>Welcome to </span>
<span class="bg-logo"><span class="geo">Geo</span>
<span>Search</span></span></h1>
<p>Search and explore interesting
places around the globe. Share your experience</p>`;
// append intro to section of the main div
section.appendChild(intro);

form.innerHTML = `<div class="search">
<input autocomplete="off" type="text" id="field-search"
class="search-field" name="search"><input type="submit" 
class="search-button" value="Explore"/></div>`;
// append form to section of the main div
section.appendChild(form);

// append section to the main div
main.appendChild(section);

features.classList.add('features');

// populate the features div with data
featureList.forEach((item) => {
    const feature = document.createElement('div'); 

    feature.classList.add('feature');
    feature.innerHTML = `<h3><i class="fa ${item.fa} fa-img"></i>
    <span>${item.heading}</span></h3><p>${item.paragraph}</p>`;

    features.appendChild(feature);
});

// append features to section div
main.appendChild(features);

// append main to the body
body.appendChild(main);

footer.innerHTML = `<p>&copy; Copyright 2019. 
&nbsp; All rights reserved. &nbsp; Designed 
and developed by <a href="https://github.com/VictorUkafor">
Victor Ukafor</a></p>`;
// append footer to the body
body.appendChild(footer);



