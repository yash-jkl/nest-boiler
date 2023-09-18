import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entities';
import { UserService } from './services/users.service';
import { UserRepository } from './repository/users.repository';
import { HashService } from '../utils/hash/hash.service';
import { BcryptService } from '../utils/hash/bcrypt/bcrypt.service';
import { TokenService, JwtService } from '../utils/token/services';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from '../utils/logger/logger.module';
import { EmailService } from '../utils/email/email.service';
import { EmailjsService } from '../utils/email/emailjs/emailjs.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule, LoggerModule],
  controllers: [UsersController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: HashService,
      useClass: BcryptService,
    },
    {
      provide: TokenService,
      useClass: JwtService,
    },
    {
      provide: EmailService,
      useClass: EmailjsService,
    },
  ],
  exports: [UserService],
})
export class UsersModule {}
