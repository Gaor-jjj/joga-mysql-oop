const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given('I start on the homepage', async function () {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('http://localhost:3025');
});
  
When('I click on the login link', async function () {
    await page.click('a[href="/user/login"]');
});
  
When('I enter valid login credentials', async function () {
    await page.type('input[name="username"]', 'admin');
    await page.type('input[name="password"]', 'qwerty');
});
  
When('I submit the login form', async function () {
    await page.click('button[type="submit"]');
});
  
Then('I should see the welcome message', async function () {
    await page.waitForSelector('div.login');
    const welcomeText = await page.$eval('div.login p', el => el.textContent.trim());
    
    if (welcomeText !== 'Welcome, admin!') {
        throw new Error(`Expected text to be "Welcome, admin!" but was "${welcomeText}"`);
    }
});

Then('I log out', async function(){
    await page.click('a[href="/user/logout"]');
    await page.waitForSelector('a[href="/user/login"]');
    await browser.close();
})