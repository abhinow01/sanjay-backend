import { Controller, Get, Query, Res } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Get('blog')
  async getBlogContent(@Query('url') url: string, @Res() res: Response) {
    try {
      const textContent = await this.scrapingService.scrapeBlog(url);
      
      // Read the HTML template
      const templatePath = path.join(__dirname, '../../views/text-to-speech.html');
      let htmlContent = fs.readFileSync(templatePath, 'utf8');
      
      // Replace placeholder with actual text content
      htmlContent = htmlContent.replace('%TEXT%', textContent);
      
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred while processing your request.');
    }
  }
}