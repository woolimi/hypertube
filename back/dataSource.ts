import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './src/user/user.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'db-mysql',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [
	User,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

export default dataSource;