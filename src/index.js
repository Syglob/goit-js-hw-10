import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
//
const DEBOUNCE_DELAY = 300;
import { fetchCountries } from './fetchCountries.js';
const searchInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
//
//
searchInput.addEventListener('input', debounce(getDataInput, DEBOUNCE_DELAY));
//
//
function getDataInput(e) {
  const searchValue = searchInput.value;
  fetchCountries(searchValue)
    .then(countries => {
      if (countries.length > 10) {
        countryList.innerHTML = '';
        Notify.warning('Too many matches found. Please enter more specific query!');
      } else if (countries.length > 2 && countries.length < 10) {
        showCountriesList(countries);
      } else if (countries.length === 1) {
        showCountry(countries);
        countryList.innerHTML = '';
      } else {
        clear();
      }
    })
    .catch(err => console.log(err));
  if (searchValue === '') {
    clear();
  }
}
//
function showCountriesList(countries) {
  countryInfo.innerHTML = '';
  const countryListItems = countries.map(country => {
    return `<li class ="info">
              <span class="country-flag"><img width = "40px" src="${country.flags.svg}" alt="country flag"></span>
              <span class="country-name">${country.name.official}</span>
          </li>`;
  });
  countryList.innerHTML = countryListItems.join('');
}
//
//
function showCountry(countries) {
  countryList.innerHTML = '';
  const countryListItems = countries.map(country => {
    return `<p class ="card-info">
              <p class="country-flag"><img width = "100px" src="${
                country.flags.svg
              }" alt="country flag"></p>
              <p class="country-name">${country.name.official}</p>
              <p class="country-capital"><span class = "item_mod">Capital:</span> ${
                country.capital
              }</p>
              <p class="country-population"><span class = "item_mod">Population:</span> ${
                country.population
              }</p>
              <p class="country-languages"><span class = "item_mod">Languages:</span> ${Object.values(
                country.languages,
              )}</p>
          </p>`;
  });
  countryInfo.innerHTML = countryListItems.join('');
}
//
function clear() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
