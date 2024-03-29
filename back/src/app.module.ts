import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { MovieModule } from './movie/movie.module';
import { join } from 'path';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: './movies',
      serveRoot: '/movies/',
    }),
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-mysql',
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      // synchronize: true,
      // migrationsRun: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    MovieModule,
    CommentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
