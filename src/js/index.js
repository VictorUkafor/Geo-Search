require('babel-polyfill');
const { featureList } = require('./dummy-data.js');
const { form, features, message } = require('./landing-page.js');
const { input, clearIcon, placeSearch } = require('./result-page.js');

// submit button
const submit = document.querySelector('.search-button');


// set page title
document.title = 'Explore your favourite places - GeoSearch';

clearIcon.style.display = 'none';

// populate the features div with data
featureList.forEach((item) => {
  const feature = document.createElement('div');

  feature.classList.add('feature');
  feature.innerHTML = `<h3><i class="fa ${item.fa} fa-img"></i>
  <span>${item.heading}</span></h3><p>${item.paragraph}</p>`;

  features.appendChild(feature);
});


// runs when user is typing in the search field
input.addEventListener('input', () => {
  const value = input.value.trim();
  const searchParams = new URLSearchParams(window.location.search);

  if (value) {
    clearIcon.style.display = 'block';

    // enter search text into address bar
    // as the user is typing
    searchParams.set('search', value);
    const newRelativePathQuery = `${window.location.pathname}?${
      searchParams.toString()}`;
    window.history.pushState(null, '', newRelativePathQuery);

    // checks if the search text is greater than 50
    // 50 characters is the maximum number allowed
    if (value.length > 50) {
      input.style.border = '1px solid #e63830';
      submit.setAttribute('disabled', 'disabled');
      submit.classList.add('no-text');
      message.innerHTML = '';
      message.innerHTML = `<p id="error">You've
      exceeded the 50 characters limit</p>`;

    // checks if search string is separated by comma.
    // This helps to maximise search precision
    } else if (!value.includes(',')) {
      input.style.border = '0';
      submit.removeAttribute('disabled');
      submit.classList.remove('no-text');
      message.innerHTML = '';
      message.innerHTML = `<p id="warning">For best 
      search result enter two related places separated 
      by a comma. e.g Lagos, Nigeria</p>`;

    // search terms passing validations are
    // allowed for processing
    } else {
      input.style.border = '0';
      submit.removeAttribute('disabled');
      submit.classList.remove('no-text');
      message.innerHTML = '';
    }

  // sets submit button to disabled when search
  // field is empty and removes the clear icon
  } else {
    window.history.pushState(null, '', window.location.pathname);

    submit.setAttribute('disabled', 'disabled');
    submit.classList.add('no-text');
    message.innerHTML = '';
    clearIcon.style.display = 'none';
  }
});


// runs when  the user submits the search form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  placeSearch(input.value.trim());
});


// runs when user types away from the search field
input.addEventListener('blur', () => {
  if (input.value.trim()) {
    clearIcon.style.display = 'block';
  }
});


// runs when user clicks on the clear
// out sign in the search field
clearIcon.addEventListener('click', () => {
  input.value = '';
  input.style.border = '0';
  message.innerHTML = '';
  clearIcon.style.display = 'none';
  window.history.pushState(null, '', window.location.pathname);
});


// runs when the user refreshes the page
window.addEventListener('DOMContentLoaded', () => {
  // grabs the search term from the url
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');
  message.innerHTML = '';

  if (search) {
    // displays error when the search term exceeds 50
    // charaters. Also displays error message
    if (search.length > 50) {
      submit.setAttribute('disabled', 'disabled');
      submit.classList.add('no-text');
      message.innerHTML = `<p id="error">You've exceeded 
      the 50 characters limit</p>`;

    // sends search term for making AJAX request
    } else {
      submit.removeAttribute('disabled');
      submit.classList.remove('no-text');
      message.innerHTML = '';
      placeSearch(search);
    }

  // displays the landing page when search term
  // can not be found in the url
  } else if (!input.value.trim()) {
    submit.setAttribute('disabled', 'disabled');
    submit.classList.add('no-text');
  } else {
    submit.removeAttribute('disabled');
    submit.classList.remove('no-text');
  }
});
