const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // 1) Give yourself a giant viewport (here 4K UHD)
  await page.setViewport({ width: 3840, height: 2160 });

  // 2) Load your wrapper
  await page.goto('https://raeburbt.github.io/weather-display/', {
    waitUntil: 'networkidle2'
  });

  // 3) Wait for your cards to appear
  await page.waitForSelector('.period', { timeout: 10000 });

  // 4) Snap the screenshot without any clipping
  //    (it will be the full 3840×2160 image)
  await page.screenshot({ path: 'weather.png' });

  await browser.close();
})();

