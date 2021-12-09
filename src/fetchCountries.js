import { Notify } from 'notiflix';

export function fetchCountries(nameCountry) {
  return fetch(
    `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages`,
  )
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching countries');
      }
      return res.json();
    })
    .then(data => {
      const countries = data;
      return countries;
    })
    .catch(err => {
      console.log('fetching err', err);
      Notify.failure('No matches found. Please try again!');
    });
}
