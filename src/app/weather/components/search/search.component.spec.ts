import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("search", () => {
    describe('when cityName has a value', () => {
      it('should emit the city name', () => {
        let emittedCityName;
        component.city.subscribe(cityName => emittedCityName = cityName);
        const dummyCityName = 'dummyCityName'
        component.cityName = dummyCityName;

        component.search();

        expect(emittedCityName).toEqual(dummyCityName);
      });
    });

    describe('when cityName is empty', () => {
      it('should not emit the city name', () => {
        let emittedCityName;
        component.city.subscribe(cityName => emittedCityName = cityName);
        const dummyCityName = ''
        component.cityName = dummyCityName;

        component.search();

        expect(emittedCityName).toBeUndefined();
      });
    });
  });
});
