import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { Movie } from 'src/movie/movie.entity';
import { MoviesWatched } from 'src/movie/movies-watched.entity';
import { UserFactory } from 'src/database/factory/user.factory';
import dotenv from 'dotenv';
import { CommentFactory } from 'src/database/factory/comment.factory';
import { MovieFactory } from 'src/database/factory/movie.factory';
import { MainSeeder } from 'src/database/seeds/01.main.seed';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'db-mysql',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User, Comment, Movie, MoviesWatched],

  synchronize: true,
  logging: true,
  migrations: [],
  subscribers: [],
  factories: [UserFactory, CommentFactory, MovieFactory],
  seeds: [MainSeeder],
};

const dataSourceCheck = new DataSource(options);

dataSourceCheck.initialize().then(async () => {
  await dataSourceCheck.synchronize(true);
  await runSeeders(dataSourceCheck);
  process.exit();
});
