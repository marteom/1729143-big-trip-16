export default class SortView {
  static getCitiesTemplate(cities) {
    let citiesList = '';
    cities.forEach((city) => { citiesList += `<option value="${city}"></option>`; });
    return citiesList;
  }
}
