export const createCitiesTemplate = (cities) => {
  let citiesList = '';
  cities.forEach((city) => {citiesList += `<option value="${city}"></option>`;});
  return citiesList;
};
