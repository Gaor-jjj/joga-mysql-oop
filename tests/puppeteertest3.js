const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });

  // Test 1: Log in with admin account
  await page.goto('http://localhost:3025/user/login');
  await page.type('input[name="username"]', 'admin');
  await page.type('input[name="password"]', 'qwerty');
  await page.click('button[type="submit"]');
  
  // Wait for navigation after login
  await page.waitForNavigation();

  console.log('Test 1 Passed: Logged in as admin');

  // Test 2: Navigate to create new article page
  await page.click('a[href="/article/create"]');
  await page.waitForSelector('form');
  console.log('Test 2 Passed: Navigated to create new article page');

  // Test 3: Fill out the article creation form and submit
  await page.type('input[name="name"]', 'Testing');
  await page.type('input[name="slug"]', 'testing');
  await page.type('input[name="image"]', 'testing.jpg');
  await page.type('textarea[name="body"]', 'testing');

  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  console.log('Test 3 Passed: Article created successfully');

  // Test 4: Click on the delete button
  await page.waitForSelector('.danger');
  await page.click('.danger');
  await page.waitForNavigation()
  console.log('Test 4 Passed: Article deleted successfully');

  // Test 5: Logout
  const logoutLinkSelector = 'a[href="/user/logout"]';
  await page.waitForSelector(logoutLinkSelector);
  await page.click(logoutLinkSelector);

  // Wait for the login link to appear, indicating successful logout
  await page.waitForSelector('a[href="/user/login"]'); 
  console.log('Test 5 Passed: Logged out successfully');

  // Close the browser
  await browser.close();
})();
