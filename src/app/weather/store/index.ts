import { ActionReducerMap } from "@ngrx/store";

import { Weather } from "../../model/weather";
import * as fromWeather from "./reducers/weather";
import { WeatherEffects } from "./effects/weather";

export interface WeatherState {
    weather: Weather[];
}

export const reducers: ActionReducerMap<WeatherState> = {
    weather: fromWeather.reducer,
};

export const effects = [WeatherEffects]


