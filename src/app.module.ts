import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsController } from './restaurant/restaurants.controller';
import { RestaurantsService } from './restaurant/restaurants.service';
import { Restaurant } from './restaurant/restaurant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5050'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'restaurant_db',
      entities: [Restaurant],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([Restaurant]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class AppModule {}
