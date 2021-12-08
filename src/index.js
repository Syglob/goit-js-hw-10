import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
import { fetchCountries } from './fetchCountries.js';
const searchInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
//

searchInput.addEventListener('input', debounce(getDataInput, DEBOUNCE_DELAY));
//
function getDataInput(e) {
  const searchValue = e.target.value;
  if (searchValue.length === 0) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  if (searchValue.length < 3) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    fetchCountries(searchValue)
      .then(data => {
        const countries = data;
        const countryListItems = countries.map(country => {
          return `<li class ="info">
              <span class="country-flag"><img width = "40px" src="${country.flags.svg}" alt="country flag"></span>
              <span class="country-name">${country.name.official}</span>
          </li>`;
        });
        countryList.innerHTML = countryListItems.join('');
      })
      .catch(err => {
        console.log('beda', err);
      });
    return;
  }
  countryList.innerHTML = '';
  fetchCountries(searchValue)
    .then(data => {
      const countries = data;
      const countryListItems = countries.map(country => {
        return `<p class ="info">
              <span class="country-flag"><img width = "100px" src="${
                country.flags.svg
              }" alt="country flag"></span>
              <span class="country-name">${country.name.official}</span>
              <span class="country-capital">${country.capital}</span>
              <span class="country-population">${country.population}</span>
              <span class="country-languages">${Object.values(country.languages)}</span>
          </p>`;
      });
      countryInfo.innerHTML = countryListItems.join('');
    })

    .catch(err => {
      console.log('beda', err);
    });
  console.log(searchValue);
}
