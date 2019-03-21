import { WeatherPage } from './weather.po';
import { async } from '@angular/core/testing';
import { count } from 'rxjs/operators';
import { By } from 'selenium-webdriver';
import { by, browser } from 'protractor';

describe('angular-weather App', () => {
  let page: WeatherPage;

  beforeEach(() => {
    page = new WeatherPage();
    page.navigateTo();
  });

  it('should have the correct page header', () => {
    expect(page.pageHeader()).toEqual('AgileSphere coding test - The Weather App');
  });

  describe('when page loads', () => {
    it('should not have a list of forcasts', async () => {
      const isInTheDom = await page.getForcastTable().isPresent();
      expect(isInTheDom).toBeFalsy();
    });
  });

  describe('when search button is clicked', () => {
    describe('and the search text is empty', () => {
      it('should not have a list of forcasts', async () => {
        await page.searchButton().click();

        const isInTheDom = await page.getForcastTable().isPresent();
        expect(isInTheDom).toBeFalsy();
      });
    });

    describe('and the search text has a valid city name', () => {
      it('should add the forcast of the city to the list', async () => {
        const searchCityName = 'london';
        await page.searchTextBox().sendKeys(searchCityName);
        await page.searchButton().click();
        browser.waitForAngular();

        const rows = await page.getForcastTableRows();
        expect(rows.length).toEqual(1);
        const columns = await page.getForcastTableRowColumns(rows[0]);
        const city = await columns[0].getText();
        expect(city.toLowerCase()).toEqual(searchCityName);
      });

      it('should not add a new row to the forcast when the city is alreay in the list', async () => {
        const searchCityName = 'london';
        await page.searchTextBox().sendKeys(searchCityName);
        await page.searchButton().click();
        browser.waitForAngular();
        
        await page.searchTextBox().clear();
        await page.searchTextBox().sendKeys(searchCityName);
        await page.searchButton().click();
        browser.waitForAngular();

        const rows = await page.getForcastTableRows();
        expect(rows.length).toEqual(1);
        const columns = await page.getForcastTableRowColumns(rows[0]);
        const city = await columns[0].getText();
        expect(city.toLowerCase()).toEqual(searchCityName);
      });

      it('should add a new row to the top of the forcast list when the city is not in the list', async () => {
        const firstCity = 'london';
        await page.searchTextBox().sendKeys(firstCity);
        await page.searchButton().click();
        browser.waitForAngular();
        
        const secondCity = 'new york';
        await page.searchTextBox().clear();
        await page.searchTextBox().sendKeys(secondCity);
        await page.searchButton().click();
        browser.waitForAngular();

        const rows = await page.getForcastTableRows();
        expect(rows.length).toEqual(2);
        const columnsForRow1 = await page.getForcastTableRowColumns(rows[0]);
        const city1 = await columnsForRow1[0].getText();
        expect(city1.toLowerCase()).toEqual(secondCity);

        const columnsForRow2 = await page.getForcastTableRowColumns(rows[1]);
        const city2 = await columnsForRow2[0].getText();
        expect(city2.toLowerCase()).toEqual(firstCity);
      });
    });

    describe('and the search text has an invalid city name', () => {
      it('should not display the forcast list', async () => {
        const searchCityName = 'nonamecity';
        await page.searchTextBox().sendKeys(searchCityName);
        await page.searchButton().click();
        browser.waitForAngular();

        const isInTheDom = await page.getForcastTable().isPresent();
        expect(isInTheDom).toBeFalsy();
      });
    });
  });
});
