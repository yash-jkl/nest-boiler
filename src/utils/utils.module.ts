import { Module } from '@nestjs/common';
import { HashModule } from './hash/hash.module';
import { TokenService, JwtService } from './token/services';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import {
  AdminAccessTokenGuard,
  AuthenticationGuard,
  UserAccessTokenGuard,
} from './token/guards';
import { LoggerModule } from './logger/logger.module';
import { HashService } from './hash/hash.service';
import { BcryptService } from './hash/bcrypt/bcrypt.service';
import { EmailModule } from './email/email.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [HashModule, JwtModule, LoggerModule, EmailModule, PaymentsModule],
  providers: [
    {
      provide: TokenService,
      useClass: JwtService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: HashService,
      useClass: BcryptService,
    },
    UserAccessTokenGuard,
    AdminAccessTokenGuard,
  ],
  exports: [],
})
export class UtilsModule {}
