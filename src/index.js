import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
// import { debounce } from 'throttle-debounce';
// import { functions } from 'lodash';

const DEBOUNCE_DELAY = 300;

const searchInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// import fetchCountries from '/fetchCountries';
function fetchCountries(nameCountry) {
  return fetch(
    `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages`,
  )
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching countries');
      }
      Notify.success('Страны найдены');
      return res.json();
    })
    .then(data => {
      const countries = data;
      console.log(countries);
      return countries;
    })
    .catch(err => {
      Notify.failure('Страны не найдены');
      console.log('fetching err', err);
    });
}

searchInput.addEventListener('input', debounce(getDataInput, DEBOUNCE_DELAY));

function getDataInput(e) {
  const searchValue = e.target.value;
  if (searchValue.length < 3) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (searchValue.length === 0) {
    countryList.innerHTML = '';
    Notify.info('Введите название страны');
    return;
  }
  fetchCountries(searchValue)
    .then(data => {
      const countries = data;
      const countryListItems = countries.map(country => {
        return `<li>
              <span class="country-name">${country.name.official}</span>
              <span class="country-capital">${country.capital}</span>
              <span class="country-population">${country.population}</span>
              <span class="country-languages">${Object.values(country.languages)}</span>
              <span class="country-flag"><img width = "100px" src="${
                country.flags.svg
              }" alt="country flag"></span>
          </li>`;
      });
      countryList.innerHTML = countryListItems.join('');
    })
    .catch(err => {
      console.log('beda', err);
    });
  console.log(searchValue);
  // fetchCountries(searchValue);
}
