const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the homepage
  await page.goto('http://localhost:3025/');
  await page.setViewport({ width: 1080, height: 1024 });

  // Wait for all <article> elements to load
  await page.waitForSelector('article');

  // Get the count of article elements
  const articles = await page.$$('article');
  console.log(`Found ${articles.length} articles on the homepage.`);

  // Loop through each article
  for (let i = 0; i < articles.length; i++) {
    // Re-select the article elements after each navigation
    const articles = await page.$$('article');
    
    // Click on the article
    await articles[i].click();

    // Wait for the page to load after clicking
    await page.waitForNavigation();

    // Take a screenshot of the article page
    await page.screenshot({ path: `article-${i + 1}.png`, fullPage: true });
    console.log(`Screenshot of article ${i + 1} taken.`);

    // Navigate back to the homepage
    await page.goBack();
    await page.waitForSelector('article');
  }

  await browser.close();
})();
