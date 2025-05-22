const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

// …after newPage()
await page.setViewport({ width: 2005, height: 1128 });
await page.goto('https://raeburbt.github.io/weather-display/', { waitUntil: 'networkidle2' });
const clip = { x: 0, y: 0, width: 2005, height: 1128 };
await page.screenshot({ path: 'weather.png', clip });


  await browser.close();
})();
