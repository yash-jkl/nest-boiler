import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [StripeService],
})
export class StripeModule {}
