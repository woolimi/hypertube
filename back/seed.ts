import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { User } from './src/user/user.entity';
import { Comment } from './src/comment/comment.entity';
import { Movie } from './src/movie/movie.entity';
import { MoviesWatched } from './src/movie/movies-watched.entity';
import { UserFactory } from "./src/database/factory/user.factory";
import dotenv from 'dotenv';
import MainSeeder from "./src/database/seeds/user.seed";

dotenv.config();
// const {
//   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME,
// } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'db-mysql',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // entities: [
  //   User, Comment, Movie, MoviesWatched
  // ],
  // additional config options brought by typeorm-extension
  synchronize: true,
  logging: true,
  migrations: [],
  subscribers: [],
  factories: [],
  seeds: [MainSeeder],
};

const dataSourceCheck = new DataSource(options);

dataSourceCheck.initialize().then(async () => {
  await dataSourceCheck.synchronize(true);
  await runSeeders(dataSourceCheck);
  process.exit();
});
