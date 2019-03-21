import { cold } from 'jasmine-marbles';
import { Actions } from "@ngrx/effects";
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { WeatherEffects } from './weather';
import { Weather } from '../../../model/weather';
import { WeatherActionTypes, SearchWeatherByCitySuccess, SearchWeatherByCityFail } from "../actions/weather";


describe('weather effects', () => {
    describe('searchWeatherByCity [SearchForecastByCity action]', () => {
        let source, mockWeatherService;
        beforeEach(() => {
            source = cold('a', { a: { type: WeatherActionTypes.SearchForecastByCity } });
            mockWeatherService = jasmine.createSpyObj('WeatherService', ['searchWeatherForCity']);
        });

        describe('when WeatherService.searchWeatherForCity is succeeds', () => {
            it('should create a SearchWeatherByCitySuccess action with the expected payload', () => {
                const mockWeatherResult = <Weather>[{ dummyProperty: 'dummyValue' }];
                mockWeatherService.searchWeatherForCity.and.returnValue(of(mockWeatherResult));
                const effects = new WeatherEffects(new Actions(source), mockWeatherService);

                const expected = cold('a', { a: new SearchWeatherByCitySuccess(mockWeatherResult) });
                expect(effects.searchWeatherByCity).toBeObservable(expected);
            });
        });

        describe('when WeatherService.searchWeatherForCity fails', () => {
            it('should create a SearchWeatherByCityFail action', () => {
                mockWeatherService.searchWeatherForCity.and.returnValue(ErrorObservable.create(new Error()));
                const effects = new WeatherEffects(new Actions(source), mockWeatherService);

                const expected = cold('a', { a: new SearchWeatherByCityFail() });
                expect(effects.searchWeatherByCity).toBeObservable(expected);
            });
        });
    })

});