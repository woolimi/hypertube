import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export default class MoviesWatchedSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // TODO
    // const commentFactory = factoryManager.get(Comment);

    // await commentFactory.saveMany(10);
  }
}

