import { Action } from "@ngrx/store";
import { of } from "rxjs/observable/of";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";

import { WeatherService } from "../../weather.service";
import * as WeatherActions from "../actions/weather";

@Injectable()
export class WeatherEffects {

    constructor(private actions: Actions,
        private weatherService: WeatherService) { }

    @Effect()
    searchWeatherByCity: Observable<Action> = this.actions.pipe(
        ofType(WeatherActions.WeatherActionTypes.SearchForecastByCity),
        map((action: WeatherActions.SearchForecastByCity) => action.payload),
        switchMap(payload =>
            this.weatherService.searchWeatherForCity(payload).pipe(
                map(forecast => (new WeatherActions.SearchWeatherByCitySuccess(forecast))),
                catchError(err => of(new WeatherActions.SearchWeatherByCityFail()))
            )
        )
    );
}