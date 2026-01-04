import { Controller, Get, Res, Query } from '@nestjs/common';
import type { Response } from 'express';
import { RestaurantsService } from './restaurants.service';
import * as path from 'path';
import * as fs from 'fs';

@Controller()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async getIndex(@Res() res: Response) {
    try {
      const htmlPath = path.join(process.cwd(), 'src', 'static', 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf-8');
      
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.status(200).send(html);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load index page' });
    }
  }

  @Get('restaurants')
  async getRestaurants(@Query('count') count?: string) {
    const defaultResults = parseInt(process.env.DEFAULT_RESULTS || '8');
    const limitCount = count ? parseInt(count) : defaultResults;
    
    const restaurants = await this.restaurantsService.getRestaurants(limitCount);
    return restaurants;
  }
}