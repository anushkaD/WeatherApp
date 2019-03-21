import { browser, by, element, WebElement, ElementFinder } from 'protractor';

export class WeatherPage {
  navigateTo() {
    return browser.get('http://localhost:4200');
  }

  pageHeader() {
    return element(by.css('.navbar-brand')).getText();
  }

  searchButton() {
    return element(by.css('.btn-search'));
  }

  searchTextBox() {
    return element(by.id('city'));
  }

  getForcastTable() {
    return element(by.css('.table'))
  }

  getForcastTableRows() {
    return element.all(by.css('tbody > tr'));
  }

  getForcastTableRowColumns(row: ElementFinder) {
    return row.all(by.tagName('td'));
  }
}
