import { Module } from '@nestjs/common';
import { MfaAuthService } from './mfa-auth.service';
import { MfaAuthController } from './mfa-auth.controller';

@Module({
  controllers: [MfaAuthController],
  providers: [MfaAuthService],
})
export class MfaAuthModule {}
