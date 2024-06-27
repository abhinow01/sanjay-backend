// src/scraping/scraping.service.ts

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
      await page.goto(url);
      
      const client = await page.createCDPSession();
      console.log('Waiting captcha to solve...');
      // @ts-ignore: Ignore the type check for this specific line
      const { status } = await client.send('Captcha.waitForSolve', {
          detectTimeout: 10000,
      });
      console.log('Captcha solve status:', status);
      
      console.log('Navigated! Scraping page content...');
      // const html = await page.content();
      // console.log(html);
      // return html;
      const textContent = await page.evaluate(()=>{
        const removeElement = (element)=>{
          element.remove();
        }
        document.querySelectorAll('script').forEach(removeElement);
        document.querySelectorAll('style').forEach(removeElement);
        return document.body.textContent;
      })
      console.log('Text content:', textContent.trim());
      return textContent.trim();
    } finally {
      await browser.close();
    }
  }
}
