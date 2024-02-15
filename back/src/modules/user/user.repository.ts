// user.repository.ts
import { Repository } from 'typeorm';
import { User } from './user.entity';

export class UserRepository extends Repository<User> {
  // Add custom methods here if needed
}
