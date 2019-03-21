import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Output() city = new EventEmitter<string>();

  cityName = '';

  constructor() { }

  search() {
    if (this.cityName) {
      this.city.emit(this.cityName);
    }
  }
}
