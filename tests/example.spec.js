// @ts-check
const { test, expect } = require('@playwright/test');

test('check if article pages load successfully and images are loaded', async ({ page }) => {
  // Start from the main page
  await page.goto('/');

  // Locate all h2 elements on the page
  const headings = await page.locator('h2').all();

  // Loop through each article 
  for (let i = 0; i < headings.length; i++) {
    
    const link = headings[i].locator('a');
    await link.click();

    // Check if the <h1> element is visible on the new page
    await expect(page.locator('h1')).toBeVisible();

    // Check if the image is loaded on the article page
    const imgLocator = page.locator('img');
    await expect(imgLocator).toBeVisible(); // Check if the image is visible
    await expect(imgLocator).toHaveAttribute('src'); // Ensure it has a 'src' attribute

    // Go back to the previous page
    await page.goBack();

    // Re-fetch the h2 elements, as the page reloads after each goBack
    await page.waitForSelector('h2');
  }
});

test('check registration protections', async ({ page }) => {
  // Start from the main page
  await page.goto('/');

  // Click on the "Register" link
  await page.locator('text=Register').click();

  // Fill out the registration form with an existing username
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="email"]', 'test@test');
  await page.fill('input[name="password"]', 'qwerty');
  await page.click('button[type="submit"]');

  // Check for the error message for existing username
  await expect(page.locator('text=Username already exists')).toBeVisible();
  await expect(page.url()).toBe('http://localhost:3025/user/register'); // Ensure the URL hasn't changed

  // Fill out the registration form with a short password
  await page.fill('input[name="username"]', 'uniqueuser'); 
  await page.fill('input[name="email"]', 'test@test');
  await page.fill('input[name="password"]', 'abc'); 
  await page.click('button[type="submit"]');

  // Check for the error message for short password
  await expect(page.locator('text=Password must be at least 6 characters long')).toBeVisible();
  await expect(page.url()).toBe('http://localhost:3025/user/register'); // Ensure the URL hasn't changed
});

test('check login functionality', async ({ page }) => {
  // Navigate to the main page
  await page.goto('/');

  // Click on the "Login" link
  await page.locator('text=Login').click();

  // Fill out the login form
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'qwerty');
  await page.click('button[type="submit"]');

  // Verify the new page has the welcome message
  await expect(page.locator('text=Welcome, admin!')).toBeVisible();
  
  // Check if "Create New Article" link is present
  await expect(page.locator('text=Create New Article')).toBeVisible();

  // Click on the "Logout" link
  await page.locator('text=Logout').click();
  await expect(page).toHaveURL('/');
});
