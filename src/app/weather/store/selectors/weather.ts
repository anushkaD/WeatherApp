import { createFeatureSelector, createSelector } from "@ngrx/store";

import { WeatherState } from "..";

const getWeatherFeatureState = createFeatureSelector<WeatherState>('weather');

export const getWeatherState = createSelector(
  getWeatherFeatureState,
  state => state.weather
);