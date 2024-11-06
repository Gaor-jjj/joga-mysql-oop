const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the homepage
  await page.goto('http://localhost:3025/');
  await page.setViewport({ width: 1080, height: 1024 });

  // Click on the login link
  const loginLinkSelector = 'a[href="/user/login"]';
  await page.waitForSelector(loginLinkSelector);
  await page.click(loginLinkSelector);

  // Wait for the login form to appear
  await page.waitForSelector('form');

  // Test 1: Attempt login with incorrect credentials
  await page.type('input[name="username"]', 'fakeuser'); 
  await page.type('input[name="password"]', 'randompass');
  await page.click('button[type="submit"]'); 

  // Wait for the error message to appear
  await page.waitForFunction('document.body.innerText.includes("Invalid username or password")');
  
  // Verify the error message content
  const errorMessage = await page.evaluate(() => {
    return document.body.innerText.includes("Invalid username or password");
  });

  if (errorMessage) {
    console.log('Test 1 Passed: Invalid login displays correct error message.');
  } else {
    console.log('Test 1 Failed: Incorrect error message.');
  }

  // Test 2: Attempt login with correct credentials
  await page.click('input[name="username"]', { clickCount: 3 });
  await page.type('input[name="username"]', 'admin'); 
  await page.click('input[name="password"]', { clickCount: 3 });
  await page.type('input[name="password"]', 'qwerty');
  await page.click('button[type="submit"]');

  // Wait for redirection to homepage
  await page.waitForNavigation();

  // Check for the welcome message inside the .login div
  const welcomeMessageSelector = 'div.login p';
  await page.waitForSelector(welcomeMessageSelector);
  const welcomeMessage = await page.$eval(welcomeMessageSelector, el => el.textContent);

  if (welcomeMessage.includes('Welcome, admin!')) {
    console.log('Test 2 Passed: Valid login displays correct welcome message.');
  } else {
    console.log('Test 2 Failed: Welcome message not found or incorrect.');
  }

  // Test 3: Click the logout link
  const logoutLinkSelector = 'a[href="/user/logout"]';
  await page.waitForSelector(logoutLinkSelector);
  await page.click(logoutLinkSelector);

  // Wait for login link to appear
  await page.waitForSelector('a[href="/user/login"]');

  // Test if the login link is visible (indicating successful logout)
  const loginLinkVisible = await page.$(loginLinkSelector) !== null;
  
  if (loginLinkVisible) {
    console.log('Test 3 Passed: Login link is visible after logout, indicating successful logout.');
  } else {
    console.log('Test 3 Failed: Login link is not visible after logout.');
  }

  await browser.close();
})();
