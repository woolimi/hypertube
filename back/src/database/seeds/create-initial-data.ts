import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../user/user.entity';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        await userRepository.insert([{
			firstName: 'marvin',
			lastName: 'gaye',
			username: 'mgaye',
			email:'mgaye@42.fr',
			password: 'marvinppp',
        }]);
    }
}