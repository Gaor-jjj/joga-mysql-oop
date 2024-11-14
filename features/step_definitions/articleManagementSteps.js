const { Given, When, Then, After } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser, page;

Given('I am logged in as an admin', async function () {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.goto('http://localhost:3025');
  
  await page.click('a[href="/user/login"]');
  await page.type('input[name="username"]', 'admin');
  await page.type('input[name="password"]', 'qwerty');
  await page.click('button[type="submit"]');
  
  await page.waitForSelector('div.login p');
  const welcomeText = await page.$eval('div.login p', el => el.textContent.trim());
  if (welcomeText !== 'Welcome, admin!') {
    throw new Error(`Expected text to be "Welcome, admin!" but was "${welcomeText}"`);
  }
});

When('I navigate to the article creation page', async function () {
  await page.click('a[href="/article/create"]');
  await page.waitForSelector('form');
});

When('I enter article details', async function () {
  await page.type('input[name="name"]', 'Test Article');
  await page.type('input[name="slug"]', 'test-article');
  await page.type('input[name="image"]', 'http://example.com/image.jpg');
  await page.type('textarea[name="body"]', 'Lorem Ipsum etc etc');
});

When('I submit the article form', async function () {
  await page.click('button[type="submit"]');
});

Then('I should see the created article page', async function () {
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const titleText = await page.$eval('h1', el => el.textContent.trim());
    if (titleText !== 'Test Article') {
      throw new Error(`Expected article title to be "Test Article" but found "${titleText}"`);
    }
});

Given('an article exists', async function () {
  await page.goto('http://localhost:3025/article/test-article');
  await page.waitForSelector('button.danger');
});

When('I delete the article', async function () {
  await page.click('button.danger');
});

Then('I should not see the deleted article on the homepage', async function () {
    await page.waitForSelector('h2');
  
    const articleTitles = await page.$$eval('h2', elements => elements.map(el => el.textContent.trim()));
  
    if (articleTitles.includes('Test Article')) {
      throw new Error('Expected "Test Article" to be deleted, but it was still found on the homepage.');
    }
  });

After(async function() {
  if (browser) {
    await browser.close();
  }
});
