import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async getRestaurants(count: number): Promise<Restaurant[]> {
    console.log(`fetching ${count} restaurants from database...`);
    
    const restaurants = await this.restaurantRepository.find({
      take: count,
      order: {
        id: 'ASC',
      },
    });
    
    console.log(`found ${restaurants.length} restaurants`);
    return restaurants;
  }

  async createRestaurant(restaurantData: Partial<Restaurant>): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(restaurantData);
    return await this.restaurantRepository.save(restaurant);
  }

  async seedRestaurants(restaurants: Partial<Restaurant>[]): Promise<Restaurant[]> {
    const savedRestaurants: Restaurant[] = [];
    for (const restaurantData of restaurants) {
      const restaurant = await this.createRestaurant(restaurantData);
      savedRestaurants.push(restaurant);
    }
    return savedRestaurants;
  }
}