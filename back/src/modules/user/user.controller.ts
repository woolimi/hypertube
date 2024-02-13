import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ObjectId } from 'mongodb';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  //TODO: to change using dto maybe?
  async create(@Body() user: User): Promise<User> {
    console.log(user);
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: ObjectId, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId): Promise<void> {
    return this.userService.remove(id);
  }
}
