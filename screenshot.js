const puppeteer = require('puppeteer');

(async () => {
  // Launch headless Chromium
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // === NEW: set viewport to match target image size ===
  await page.setViewport({ width: 320, height: 240 });

  // Navigate to your Pages URL
  await page.goto('https://raeburbt.github.io/weather-display/', {
    waitUntil: 'networkidle2'
  });

  // === UPDATED: shrink clip to match viewport ===
  const clip = { x: 0, y: 0, width: 320, height: 240 };

  // Take the screenshot
  await page.screenshot({ path: 'weather.png', clip });

  await browser.close();
})();
