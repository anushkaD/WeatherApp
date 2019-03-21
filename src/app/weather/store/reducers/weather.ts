import { WeatherActions, WeatherActionTypes } from "../actions/weather";
import { Weather } from "../../../model/weather";

export const initialState: Weather[] = [];

export function reducer(state = initialState, action: WeatherActions): Weather[] {
    switch (action.type) {
        case WeatherActionTypes.SearchForecastByCitySuccess:
            const index = state.findIndex(w => w.city.id === action.payload.city.id);
            return [
                ...state.slice(0, index),
                action.payload,
                ...state.slice(index + 1)
            ];

        case WeatherActionTypes.SearchForecastByCityFail:
            // NOTE this error has to be displayed to the user did not do it becasue the template didn't have an error
            return state;
        default:
            return state;
    }
}