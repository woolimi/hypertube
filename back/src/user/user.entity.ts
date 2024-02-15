import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', name: 'username', length: 20, unique: true })
  username: string;

  @Column({ type: 'varchar', name: 'email', length: 40, unique: true })
  email: string;

  @Column()
  password: string;
}
