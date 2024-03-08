import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
    private connection: DataSource,
  ) {}

  async findAll(page: number, perPage: number): Promise<User[]> {
    return this.userRepository.find({
      select: {
        username: true,
        image: true,
        firstName: true,
        lastName: true,
      },
      skip: page * perPage - perPage,
      take: perPage,
    });
  }

  async findOneById(id: string, isSelf?: boolean): Promise<User> {
    return this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        image: true,
        firstName: true,
        lastName: true,
        email: isSelf ? true : false,
        emailVerified: isSelf ? true : false,
        provider: isSelf ? true : false,
      },
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

    let duplicateUsername;
    if (user.username) {
      duplicateUsername = await this.userRepository.findOne({
        where: [{ username: user.username }],
      });
    }

    let duplicateEmail;
    if (user.email) {
      duplicateEmail = await this.userRepository.findOne({
        where: [{ email: user.email }],
      });
    }

    if (duplicateEmail && duplicateEmail.email == user.email)
      throw new UnauthorizedException({ code: 'EMAIL_ALREADY_EXISTS' });
    else if (duplicateUsername && duplicateUsername.username == user.username)
      throw new UnauthorizedException({ code: 'USERNAME_ALREADY_EXISTS' });

    return this.userRepository.update(id, user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async saveRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.userRepository.update(id, { refreshToken });
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
