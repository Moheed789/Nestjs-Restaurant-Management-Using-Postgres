import { DataSource } from 'typeorm';
import { Restaurant } from './src/restaurant/restaurant.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const restaurants = [
  { 
    name: "Fangtasia", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fangtasia.png", 
    themes: ["true blood"] 
  },
  { 
    name: "Shoney's", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/shoney's.png", 
    themes: ["cartoon", "rick and morty"] 
  },
  { 
    name: "Freddy's BBQ Joint", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/freddy's+bbq+joint.png", 
    themes: ["netflix", "house of cards"] 
  },
  { 
    name: "Pizza Planet", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/pizza+planet.png", 
    themes: ["netflix", "toy story"] 
  },
  { 
    name: "Leaky Cauldron", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/leaky+cauldron.png", 
    themes: ["movie", "harry potter"] 
  },
  { 
    name: "Lil' Bits", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/lil+bits.png", 
    themes: ["cartoon", "rick and morty"] 
  },
  { 
    name: "Fancy Eats", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/fancy+eats.png", 
    themes: ["cartoon", "rick and morty"] 
  },
  { 
    name: "Don Cuco", 
    image: "https://d2qt42rcwzspd6.cloudfront.net/manning/don%20cuco.png", 
    themes: ["cartoon", "rick and morty"] 
  },
];

async function seedDatabase() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5050'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'restaurant_db',
    entities: [Restaurant],
    synchronize: true,
  });

  try {
    await dataSource.initialize();
    console.log('Database connection initialized');

    const restaurantRepository = dataSource.getRepository(Restaurant);

    const existingCount = await restaurantRepository.count();
    
    if (existingCount > 0) {
      console.log(`Database already contains ${existingCount} restaurants. Skipping seeding.`);
      return;
    }

    const savedRestaurants: Restaurant[] = [];
    for (const restaurantData of restaurants) {
      const restaurant = restaurantRepository.create({
        ...restaurantData,
        themes: JSON.stringify(restaurantData.themes)
      });
      const saved = await restaurantRepository.save(restaurant);
      savedRestaurants.push(saved);
      console.log(`Seeded: ${saved.name}`);
    }

    console.log(`Successfully seeded ${savedRestaurants.length} restaurants`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Database connection closed');
    }
  }
}

seedDatabase();