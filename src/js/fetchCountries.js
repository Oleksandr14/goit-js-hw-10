const URL = `https://restcountries.com`;

export const fetchCountries = name => {
  return fetch(`${URL}/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
};