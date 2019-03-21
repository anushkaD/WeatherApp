import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { WeatherState } from './store';
import { Weather } from '../model/weather';
import { getWeatherState } from './store/selectors/weather';
import { SearchForecastByCity } from './store/actions/weather';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (city)="citySearch($event)"></app-search>
  <app-results [weather]="weather | async"></app-results>  `
})
export class WeatherContainer {
  weather: Observable<Weather[]>;

  constructor(private store: Store<WeatherState>) {
    this.weather = this.store.pipe(select(getWeatherState));
  }

  citySearch(name: string) {
    this.store.dispatch(new SearchForecastByCity(name));
  }
}
