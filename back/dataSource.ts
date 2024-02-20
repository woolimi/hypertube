import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './src/user/user.entity';
import { Comment } from './src/comment/comment.entity';
import { Movie } from './src/movie/movie.entity';
import { MoviesWatched } from './src/movie/movies-watched.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'db-mysql',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User, Comment, Movie, MoviesWatched],
  migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: true,
  logging: true,
});

export default dataSource;
