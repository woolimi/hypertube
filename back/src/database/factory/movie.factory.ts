import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Movie } from '../../movie/movie.entity';

export const MovieFactory = setSeederFactory(Movie, (faker: Faker) => {
  const movie = new Movie();
  // You can add more customization or associations here if needed

  return movie;
});
