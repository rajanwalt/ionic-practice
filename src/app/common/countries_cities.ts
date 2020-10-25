import * as countries_cities from './../../assets/json/countries_cities.json';
import * as _ from 'underscore';

export const counries = () => _.chain(countries_cities.data).pluck( 'country').uniq().value()

export const cities_code = (value) => _.filter(countries_cities.data, (data) => data.country == value)

export const cities = (value) => _.pluck(cities_code(value), 'city')

export const countryCode = (value) => _.chain(cities_code(value)).pluck('iso2').first().value()