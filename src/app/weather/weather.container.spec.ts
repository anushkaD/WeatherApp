import { of } from 'rxjs/observable/of';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherContainer } from './weather.container';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let store: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherContainer],
      imports: [StoreModule.forRoot({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Store, useClass: MockStore }
      ]
    })
      .compileComponents();

    store = TestBed.get(Store);
    store.setState({ weather: [] });
    spyOn(store, "dispatch");
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the weather variable to be the value that is in the store', () => {
    const mockWeather = [
      {
        city: {
          id: 123,
          name: 'dummyCountryName',
          population: 317472,
          coord: {
            lon: 1.94,
            lat: 609.0
          },
          country: 'dummyCountry'
        },
        cod: 'dummyCod',
        message: 0,
        cnt: 12,
        list: [{
          dt: 1289083,
          main: {
            temp: 12,
            temp_min: 8,
            temp_max: 15,
            pressure: 34,
            sea_level: 6700,
            grnd_level: 657,
            humidity: 89,
            temp_kf: 735
          },
          weather: [],
          clouds: { all: 13 },
          wind: {
            speed: 12,
            deg: 13
          },
          sys: undefined,
          dt_txt: '2014-06-09 09:00:00'
        }]
      }
    ];
    store.setState({ weather: { weather: mockWeather } });
    fixture.detectChanges();

    component.weather.subscribe(actualValue => expect(actualValue).toEqual(mockWeather));
  });

  describe('citySearch', () => {
    it('should dispatch SearchForecastByCity action with the payload as the value passed in', () => {
      const dummyName = 'dummyName';

      component.citySearch(dummyName);

      expect(store.dispatch).toHaveBeenCalledWith(new SearchForecastByCity(dummyName));
    });
  });

  // NOTE can check for the child components in the DOM but didn't do it because the e2e test covers them
});

import { BehaviorSubject } from 'rxjs';
import { Store, StateObservable, ActionsSubject, ReducerManager, StoreModule } from '@ngrx/store';
import { SearchForecastByCity } from './store/actions/weather';

@Injectable()
export class MockStore<T> extends Store<T> {
  private stateSubject = new BehaviorSubject<T>(undefined);

  constructor(
    state$: StateObservable,
    actionsObserver: ActionsSubject,
    reducerManager: ReducerManager
  ) {
    super(state$, actionsObserver, reducerManager);
    this.source = this.stateSubject.asObservable();
  }

  setState(nextState: T) {
    this.stateSubject.next(nextState);
  }
}

