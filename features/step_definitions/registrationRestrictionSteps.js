const { Given, When, Then, After } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given('I am on the homepage', async function () {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.goto('http://localhost:3025');
});

When('I click on the register link', async function () {
  await page.click('a[href="/user/register"]');
});

When('I fill out the registration form with username {string}, email {string}, and password {string}', async function (username, email, password) {
  await page.type('input[name="username"]', username);
  await page.type('input[name="email"]', email);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
});

Then('I should see the message {string}', async function (expectedMessage) {
  await page.waitForSelector('p');
  
  const errorMessage = await page.$eval('p', el => el.textContent.trim());

  if (errorMessage !== expectedMessage) {
    throw new Error(`Expected message to be "${expectedMessage}", but found "${errorMessage}"`);
  }
});

Then('I should still be on the registration page', async function () {
  const currentUrl = page.url();
  if (!currentUrl.endsWith('/user/register')) {
    throw new Error(`Expected to be on the registration page, but found URL: ${currentUrl}`);
  }
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});
