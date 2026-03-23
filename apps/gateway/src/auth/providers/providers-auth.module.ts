import { Module } from '@nestjs/common';
import { ProvidersAuthService } from './providers-auth.service';
import { ProvidersAuthController } from './providers-auth.controller';

@Module({
  controllers: [ProvidersAuthController],
  providers: [ProvidersAuthService],
})
export class ProvidersAuthModule {}
