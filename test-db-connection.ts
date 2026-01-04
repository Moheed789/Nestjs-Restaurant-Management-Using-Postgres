import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  console.log('Testing PostgreSQL connection...');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Port: ${process.env.DB_PORT}`);
  console.log(`Username: ${process.env.DB_USERNAME}`);
  console.log(`Database: ${process.env.DB_NAME}`);

  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5050'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'restaurant_db',
    entities: [],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    const result = await dataSource.query('SELECT version()');
    console.log('PostgreSQL version:', result[0].version);
    
  } catch (error: any) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message || error);
    console.error('Full error:', error);
    
    // Provide solutions based on error
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n📋 Solutions:');
      console.log('1. PostgreSQL server is not running');
      console.log('2. Check if PostgreSQL is installed and started');
      console.log('3. Try using Docker: docker run --name postgres -e POSTGRES_PASSWORD=1234 -p 5050:5050 -d postgres');
      console.log('4. Use a free online PostgreSQL service (see free-postgres-services.md)');
    }
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Database connection closed');
    }
  }
}

testConnection();