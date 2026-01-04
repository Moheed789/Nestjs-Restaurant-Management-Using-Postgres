# Restaurant API - NestJS with PostgreSQL

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A modern restaurant discovery API built with NestJS and PostgreSQL, replacing AWS Lambda functions with a scalable server architecture.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <img src="https://img.shields.io/badge/database-PostgreSQL-blue" alt="Database" />
  <img src="https://img.shields.io/badge/deployment-AWS%20CDK-orange" alt="Deployment" />
</p>

## 🚀 Features

- **NestJS Framework**: Modern, scalable Node.js server-side applications
- **PostgreSQL Database**: Robust relational database with TypeORM
- **Restaurant Management**: CRUD operations for restaurant data
- **Static File Serving**: Serves the frontend HTML application
- **Environment Configuration**: Flexible configuration management
- **AWS CDK**: Infrastructure as Code for deployment

## 📡 API Endpoints

### Get Index Page
**Equivalent to previous `get-index.js` Lambda function**
```
GET /
```
Returns the static HTML file from `src/static/index.html`

### Get Restaurants
**Equivalent to previous `get-restaurants.js` Lambda function**
```
GET /restaurants?count=8
```
Returns a list of restaurants from PostgreSQL database

**Query Parameters:**
- `count` (optional): Number of restaurants to return (default: 8)

## 🛠 Project setup

```bash
# Install dependencies
$ npm install

# Setup environment variables
$ cp .env.example .env
# Update .env with your database credentials
```

## 🗄️ Database Setup

### Option 1: Using Docker (Recommended)
```bash
# Start PostgreSQL container
$ docker run --name restaurant-postgres -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=restaurant_db -p 5432:5432 -d postgres:16
```

### Option 2: Free Online PostgreSQL
See `SETUP-POSTGRES.md` for detailed instructions on setting up free PostgreSQL databases.

### Seed Database
```bash
# Populate database with sample restaurants
$ npm run seed
```

## 🏃‍♂️ Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The application will be available at `http://localhost:3000`

## 🧪 Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# test database connection
$ npx ts-node test-db-connection.ts
```

## 🔄 Migration from Lambda Functions

### Original Lambda Functions → NestJS

#### `get-index.js` → `RestaurantsController.getIndex()`
- **Before**: Served static HTML from Lambda
- **After**: NestJS controller serves HTML with proper content-type headers

#### `get-restaurants.js` → `RestaurantsController.getRestaurants()`
- **Before**: DynamoDB scan with AWS SDK
- **After**: PostgreSQL query with TypeORM
- **Database**: DynamoDB → PostgreSQL
- **ORM**: Raw AWS SDK → TypeORM

## 🗂️ Database Schema

```typescript
Restaurant Entity:
- id: number (Primary Key)
- name: string
- image: string
- description: string
- cuisine: string
- rating: decimal(3,2)
- address: string
- phone: string
- website: string
- created_at: timestamp
- updated_at: timestamp
```

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `password` |
| `DB_NAME` | Database name | `restaurant_db` |
| `PORT` | Application port | `3000` |
| `DEFAULT_RESULTS` | Default number of restaurants | `8` |

## 🚀 Deployment

### AWS CDK Infrastructure
```bash
# Deploy infrastructure
$ cd cdk
$ npm install
$ cdk deploy
```

### Manual Deployment
```bash
# Build the application
$ npm run build

# Start production server
$ npm run start:prod
```

## 📚 Resources

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework
- [TypeORM Documentation](https://typeorm.io/) for database operations
- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/) for infrastructure deployment

## 🤝 Support

This project is built with NestJS, an MIT-licensed open source framework. 

## 📧 Stay in touch

- **Project Author** - [Your Name]
- **Built with** - [NestJS](https://nestjs.com/)
- **Database** - [PostgreSQL](https://postgresql.org/)
- **ORM** - [TypeORM](https://typeorm.io/)

## 📄 License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
