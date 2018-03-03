var assert = require('assert');
var fs = require('fs');

//Homepage testing
//Ensure the homepage is loading with the right title
describe('Frontier Internet Homepage', function() {
    it('should have the right title', function () {
        this.timeout(100000);
        browser.url('/');
        
        //load the browser title
        var title = browser.getTitle();
        assert.equal(title, 'Frontier® Internet Service | 855-858-4802 | Frontier Communications');
    });
});

//Ensure the three drop down menus on the top of the home page are working
describe('Frontier Internet Homepage', function() {
    it('should display menus beneath the first three options', function () {
        this.timeout(100000);
        browser.url('/');
        
        //Check menu 1
        browser.click('#menu-item-4313')
        browser.isVisible('a=All Plans')

        //Check menu 2
        browser.click('#menu-item-4314')
        browser.isVisible('a=High Speed Internet')

        //Check menu 3
        browser.click('#menu-item-4440')
        browser.isVisible('a=FiOS TV')
    });
});

//Frontier Spanish testing
//Ensure the Spanish translation link is working
describe('Frontier Spanish Version', function() {
    it('link should redirect to spanish URL', function () {
        this.timeout(100000);
        browser.url('/');
        browser.click('a=Espanol')

        //compare URLs
        browser.pause(5000)
        assert.equal(browser.getUrl(),'https://internet.frontier.com/espanol/')
    });
});

//Frontier Account login
//Ensure the account login link is working
describe('Frontier Account Login', function() {
    it('link should redirect to account login URL', function () {
        this.timeout(100000);
        browser.url('/');
        browser.click('a=My Account')

        //compare URLs
        browser.pause(5000)
        assert.notStrictEqual(browser.getUrl(),'https://frontier.com/login')
    });
});

//Frontier Business login
//Ensure the business login link is working
describe('Frontier Business Login', function() {
    it('link should redirect to business login URL', function () {
        this.timeout(100000);
        browser.url('/');
        browser.click('a=Business')

        //compare URLs
        browser.pause(5000)
        assert.equal(browser.getUrl(),'https://internet.frontier.com/business/')
    });
});

//Cart page testing
//Ensure the fields are notifying the user when they are required
describe('Frontier Cart Page', function() {
    it('should alert on required fields', function () {
        this.timeout(100000);
        browser.url('/');
        browser.click('#js-track-nav-shop-online')

        browser.waitForVisible('#address')

        //click away from each one at least once
        browser.click('#address')
        browser.click('#city')
        browser.click('#zip')
        browser.click('#address')

        //load the error messages
        var alertBox1 = $('Address is required')
        console.log(alertBox1)
        var alertBox2 = $('City is required')
        console.log(alertBox2)
        var alertBox3 = $('Zip Code is required')
        console.log(alertBox3)
        
        //confirm the error messages are not null
        assert.notEqual(alertBox1, null)
        assert.notEqual(alertBox2, null)
        assert.notEqual(alertBox3, null)
    });
});

//Confirm the service check functionality is working
describe('Frontier Cart Page', function() {
    it('should determine if service is available', function () {
        
        //No single task should take more than 60 seconds
        this.timeout(100000);
        browser.url('/');
        browser.click('#js-track-nav-shop-online')

        //Wait for service lookup page to load
        browser.waitForVisible('#address')

        //insert values on service lookup page
        browser.setValue('input#address','1101 Red Ventures Dr')
        browser.setValue('input#city','Fort Mill')
        browser.setValue('input#zip','29707')
 
        var stateSelector = $('select#State')
        stateSelector.selectByValue('NC')

        browser.click('button=Continue')

        //page load may require up to 60 seconds
        browser.pause(60000)

        assert.equal(browser.getUrl(),'https://internet.frontier.com/cart/unserviceable')
    });
});

//Confirm the service check functionality gracefully fails
describe('Frontier Cart Page', function() {
    it('should notify user of invalid addresses after 60 seconds', function () {
        
        //No single task should take more than 60 seconds
        this.timeout(100000);
        browser.url('/');
        browser.click('#js-track-nav-shop-online')

        //Wait for service lookup page to load
        browser.waitForVisible('#address')

        //insert values on service lookup page
        browser.setValue('input#address','//')
        browser.setValue('input#city','//')
        browser.setValue('input#zip','29707')
 
        var stateSelector = $('select#State')
        stateSelector.selectByValue('NC')

        browser.click('button=Continue')

        //page may require up to 60 seconds to load
        browser.pause(60000)

        assert.equal(browser.getUrl(),'https://internet.frontier.com/cart/unserviceable')

    });
});

//Price page testing
//Ensure prices are displayed and expected values are present
describe('Plan Pricing Page', function() {
    it('should display the expected values', function () {
        this.timeout(100000);
        browser.url('/');
        browser.click('#js-track-home-shop-plans')

        browser.waitForVisible('#js-track-plans-pricing-button-1')
        var price1 = browser.getText('span=25')
        console.log(price1)

        browser.waitForVisible('#js-track-plans-pricing-button-2')
        var price2 = browser.getText('span=47')
        console.log(price2)

        browser.waitForVisible('#js-track-plans-pricing-button-3')
        var price3 = browser.getText('span=46')
        console.log(price3)

        browser.waitForVisible('#js-track-plans-pricing-button-4')
        var price4 = browser.getText('span=61')
        console.log(price4)

        assert.notEqual(price1, null)
        assert.notEqual(price2, null)
        assert.notEqual(price3, null)
        assert.notEqual(price4, null)

    });
});

