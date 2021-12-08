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
      console.log(countries);
      return countries;
    })
    .catch(err => {
      Notify.failure('Nothing found');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      console.log('fetching err', err);
    });
}
