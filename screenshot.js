const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox','--disable-setuid-sandbox'],
    defaultViewport: null    // start “full‐bleed” so measuring works properly
  });
  const page = await browser.newPage();

  // 1) load your wrapper
  await page.goto('https://raeburbt.github.io/weather-display/', {
    waitUntil: 'networkidle2'
  });

  // 2) wait for the cards to render
  await page.waitForSelector('.period', { timeout: 10000 });
  await page.waitForTimeout(200);  // let images/icons paint

  // 3) find the carousel cell (or just the <body> if you know it fills the slot)
  //    Here we target the slick‐slide div around your image:
  const rect = await page.evaluate(() => {
    // adjust this selector to whatever wrapper your <img> lives in
    const el = document.querySelector('.slick-slide.slick-current');
    const r = el.getBoundingClientRect();
    return { width: Math.round(r.width), height: Math.round(r.height) };
  });

  // 4) resize Puppeteer’s viewport to that exact CSS size
  await page.setViewport({ 
    width:  rect.width, 
    height: rect.height, 
    deviceScaleFactor: 1   // avoid any retina up‐scaling 
  });

  // 5) snap the shot of exactly that rectangle
  await page.screenshot({
    path: 'weather.png',
    clip: { x: 0, y: 0, width: rect.width, height: rect.height }
  });

  await browser.close();
})();

