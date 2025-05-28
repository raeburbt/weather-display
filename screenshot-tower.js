const puppeteer = require('puppeteer');

(async () => {
  // Launch headless Chromium
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Match the .message container’s size (1299×731)
  await page.setViewport({ width: 1299, height: 731 });

  // Navigate to your Tower wrapper page
  await page.goto(
    'https://raeburbt.github.io/weather-display/index-tower.html',
    { waitUntil: 'networkidle2' }
  );

  // Wait for at least one forecast card to load
  await page.waitForSelector('.period', { timeout: 10000 });

  // Take the screenshot and save as weather-tower.png
  await page.screenshot({ path: 'weather-tower.png' });

  await browser.close();
})();

