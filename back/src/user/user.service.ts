import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';
import bcrypt from 'bcrypt';

import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private connection: Connection,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const duplicateUsername = await queryRunner.manager
      .getRepository(User)
      .findOne({ where: [{ username: user.username }] });

    const duplicateEmail = await queryRunner.manager
      .getRepository(User)
      .findOne({ where: [{ email: user.email }] });

    // 기존 로직
    // if (duplicateEmail && !duplicateEmail.emailVerified) {
    //   return duplicateEmail;
    // } else if (duplicateEmail) {
    //   throw new UnauthorizedException({ code: 'EMAIL_ALREADY_EXISTS' });
    // }

    // 새로운 로직
    if (duplicateEmail == duplicateUsername && duplicateEmail) {
      if (!duplicateEmail.emailVerified) return duplicateEmail;
    } else if (duplicateUsername) {
      if (!duplicateUsername.emailVerified) return duplicateUsername;
      else throw new UnauthorizedException({ code: 'USERNAME_ALREADY_EXISTS' });
    } else if (duplicateEmail) {
      if (!duplicateEmail.emailVerified) return duplicateEmail;
      else throw new UnauthorizedException({ code: 'EMAIL_ALREADY_EXISTS' });
    }

    let createdUser;
    try {
      user.password = hash;
      createdUser = await queryRunner.manager.getRepository(User).save(user);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return createdUser;
  }

  async update(id: string, user: UpdateUserDto): Promise<UpdateResult> {
    if (user.password) {
      user.password = await this.cryptPassword(user.password);
    }

    return this.userRepository.update(id, user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async saveRefreshToken(id: string, refreshToken: string): Promise<void> {
    console.log('id', id);
    await this.userRepository.update(id, { refreshToken });
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
