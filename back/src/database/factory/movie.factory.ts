import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Movie } from '../../movie/movie.entity';

export const MovieFactory = setSeederFactory(Movie, (faker: Faker) => {
  const movie = new Movie();
  movie.title = faker.lorem.words(3); // Generate a random title with 3 words
  movie.description = faker.lorem.sentence(); // Generate a random sentence for the description
  // You can add more customization or associations here if needed

  return movie;
});
