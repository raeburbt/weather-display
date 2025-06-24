const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
// …after const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto(
  'https://raeburbt.github.io/weather-display/index-mammoth.html',
  { waitUntil: 'networkidle2' }
);
await page.waitForSelector('.period', { timeout: 10000 });
  // ─────── ZOOM HACK ───────
await page.evaluate(() => {
  // scale everything by 2× (or whatever factor you choose)
  document.body.style.transform = 'scale(1.5)';
  document.body.style.transformOrigin = 'top left';
});
// ─────────────────────────
// No clip needed if viewport == container
await page.screenshot({ path: 'weather-mammoth.png' });


  // 3) Wait for your cards to appear
  await page.waitForSelector('.period', { timeout: 10000 });

  // 4) Snap the screenshot without any clipping
  //    (it will be the full 3840×2160 image)
  await page.screenshot({ path: 'weather-mammoth.png' });

  await browser.close();
})();
