const puppeteer = require('puppeteer');

(async () => {
  // Launch headless Chromium
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Navigate to your Pages URL
  await page.goto('https://<your-username>.github.io/weather-display/', {
    waitUntil: 'networkidle2'
  });

  // Optional: adjust the clip dimensions to fit just the widget
  const clip = { x: 0, y: 0, width: 360, height: 260 };

  // Take the screenshot
  await page.screenshot({ path: 'weather.png', clip });

  await browser.close();
})();
