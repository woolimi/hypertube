import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../user/user.entity';

import { faker } from "@faker-js/faker";
import { Comment } from '../../comment/comment.entity';
import { Movie } from '../../movie/movie.entity';

export class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const commentRepository = dataSource.getRepository(Comment);

    const userFactory = factoryManager.get(User);
    const commentFactory = factoryManager.get(Comment);
    const movieFactory = factoryManager.get(Movie);

    const users = await userFactory.saveMany(7); // Seed 7 users

    const movies = await movieFactory.saveMany(10); // Seed 7 users

    const comments = await Promise.all(Array(17)
      .fill("")
      .map(async () => {
        const comment = await commentFactory.make(
          {
            User: faker.helpers.arrayElement(users),
            Movie: faker.helpers.arrayElement(movies)
          }
        ); // Assuming there is a make() method
        return comment;
      })
    );

    // Save the comments
    await commentRepository.save(comments);
  }
}
