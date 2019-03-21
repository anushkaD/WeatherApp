import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Weather } from '../model/weather';

@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
    APPID: '010721642521f31b0fbc8c3831d45951'
  };

  constructor(private http: HttpClient) { }

  searchWeatherForCity(cityName: string): Observable<Weather> {
    return this.http.get<Weather>(this.getWeatherRequestUrl(cityName));
  }

  private getWeatherRequestUrl(cityName: string) {
    return `${this.url}?q=${cityName}&cnt=${this.params.cnt}&units=${this.params.units}&APPID=${this.params.APPID}`;
  }

}
