import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer-core';

const SBR_WS_ENDPOINT = 'wss://brd-customer-hl_8173a7af-zone-scraping_browser1:8wx0i26ljqmi@brd.superproxy.io:9222';

@Injectable()
export class ScrapingService {
  async scrapeBlog(url: string): Promise<string> {
    console.log('Connecting to Scraping Browser...');
    const browser = await puppeteer.connect({
      browserWSEndpoint: SBR_WS_ENDPOINT,
    });

    try {
      const page = await browser.newPage();
      console.log(`Connected! Navigating to ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle2' });

      await page.waitForSelector('article, main, body', { timeout: 10000 });

      console.log('Navigated! Scraping page content...');

      const textContent = await page.evaluate(() => {
        const removeElements = (selectors) => {
          selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
          });
        };

        removeElements(['script', 'style', 'img', 'header', 'footer', 'nav', '.ad', '.advertisement', '.promo', '.sidebar']);

        const mainContent = document.querySelector('article') || document.querySelector('main') || document.querySelector('body');
        const text = mainContent ? mainContent.innerText : '';

        return text.replace(/\s\s+/g, ' ').trim();
      });

      console.log('Text content:', textContent);
      return textContent;
    } finally {
      await browser.close();
    }
  }
}