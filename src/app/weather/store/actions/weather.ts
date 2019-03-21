import { Action } from '@ngrx/store';

import { Weather } from '../../../model/weather';

export enum WeatherActionTypes {
    SearchForecastByCity = '[weather] search sorecast by city',
    SearchForecastByCitySuccess = "[weather] search forecast by city success",
    SearchForecastByCityFail = "[weather] search forecast by city fail"
}

export class SearchForecastByCity implements Action {
    readonly type = WeatherActionTypes.SearchForecastByCity;
    readonly payload: string;

    constructor(city: string) {
        this.payload = city;
    }
}

export class SearchWeatherByCitySuccess implements Action {
    readonly type = WeatherActionTypes.SearchForecastByCitySuccess;
    readonly payload: Weather;

    constructor(forecast: Weather) {
        this.payload = forecast;
    }
}

export class SearchWeatherByCityFail implements Action {
    readonly type = WeatherActionTypes.SearchForecastByCityFail;
    readonly payload: string;

    constructor() {
        this.payload = "Can not find forecast";
    }
}

export type WeatherActions = SearchForecastByCity |
    SearchWeatherByCitySuccess |
    SearchWeatherByCityFail

