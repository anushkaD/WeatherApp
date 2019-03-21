import { Component, OnChanges, Input } from '@angular/core';

import { Weather, WeatherList } from '../../../model/weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnChanges {
  @Input() weather: Weather[];
  forecastForCity: NextTwentyFourHourForcast[];

  ngOnChanges() {
    this.forecastForCity = this.getForecastForCityList();
  }

  private getForecastForCityList(): NextTwentyFourHourForcast[] {
    return this.weather.map(w => {
      return {
        city: w.city.name,
        sixAm: this.getTempratureAt(w.list, Time.sixAm),
        noon: this.getTempratureAt(w.list, Time.noon),
        sixPm: this.getTempratureAt(w.list, Time.sixPm),
        midnight: this.getTempratureAt(w.list, Time.midnight)
      };
    });
  }

  private getTempratureAt(weatherList: WeatherList[], time: Time): number {

    return weatherList.find(m => m.dt_txt.match(new RegExp(`/*${time}`)) !== null).main.temp;
  }
}

interface NextTwentyFourHourForcast {
  city: string;
  sixAm: number;
  noon: number;
  sixPm: number;
  midnight: number;
}

enum Time {
  sixAm = '06:00:00',
  noon = '12:00:00',
  sixPm = '18:00:00',
  midnight = '06:00:00',
}


