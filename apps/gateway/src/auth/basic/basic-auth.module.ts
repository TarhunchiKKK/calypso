import { Module } from '@nestjs/common';
import { BasicAuthService } from './basic-auth.service';
import { BasicAuthController } from './basic-auth.controller';

@Module({
  controllers: [BasicAuthController],
  providers: [BasicAuthService],
})
export class BasicAuthModule {}
