var debounce = require('lodash.debounce');

import Notiflix from 'notiflix';

import './css/styles.css';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchCountry: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
};

refs.searchCountry.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
    let inputValue = e.target.value.trim();

    if (!inputValue) {
    return clearMarkup(``);
  }

    fetchCountries(inputValue)
        .then(response => {
            if (response.length > 10) {
                return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
            } else if (response.length > 1 && response.length < 11) {
                return renderCountriesListMarkup(response)
            } else {
                return renderCountryInfoMarkup(response)
            }
        }).catch(() => {
            clearMarkup(``)
            Notiflix.Notify.failure('Oops, there is no country with that name')
        });
};

function renderCountriesListMarkup(countries) {
    refs.countryInfo.innerHTML = '';
    const markup = countries.map(({flags, name}) => {
        return `
        <li class="list">
        <img src="${flags.svg}" width="30" height="20" alt="${name.official}">
        <p>${name.official}</p>
        </li>`;
    }).join('');

    refs.countryInfo.innerHTML = markup;
};

function renderCountryInfoMarkup(countries) {
    refs.countryInfo.innerHTML = '';
    const markup = countries.map(({flags, name, capital, population, languages}) => {
        return `
        <div class="country-container">
        <img src="${flags.svg}" width="50" height="40" alt="${name.official}">
        <p>${name.official}</p>
        </div>
        <p><span>Capital:</span>${capital}</p>
        <p><span>Population:</span>${population}</p>
        <p><span>Languages:</span>${Object.values(languages)}</p>
        `
    }).join('');

    refs.countryInfo.innerHTML = markup;
};

function clearMarkup(markup) {
  refs.countryInfo.innerHTML = markup;
}