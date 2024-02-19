import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';

import { User } from './src/user/user.entity';
import { Comment } from './src/comment/comment.entity';
import { Movie } from './src/movie/movie.entity';
import { MoviesWatched } from './src/movie/movies-watched.entity';
import MainSeeder from 'src/database/seeds/user.seed';


dotenv.config();
(async () => {
  const options: DataSourceOptions = {
    type: 'mysql',
    host: 'db-mysql',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
      User, Comment, Movie, MoviesWatched
    ],
    migrations: [__dirname + '/src/migrations/*.ts'],
    synchronize: true,
    logging: true,
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  runSeeders(dataSource, {
    seeds: ['./src/database/seeds/**/*{.ts,.js}'],
    factories: ['./src/database/factories/**/*{.ts,.js}']
  });
})();
