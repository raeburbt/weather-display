const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // set the “browser window” to full HD
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto(
    'https://raeburbt.github.io/weather-display/',
    { waitUntil: 'networkidle2' }
  );

  // take exactly the full-screen shot
  const clip = { x: 0, y: 0, width: 1920, height: 1080 };
  await page.screenshot({ path: 'weather.png', clip });

  await browser.close();
})();
