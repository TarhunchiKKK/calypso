import { Controller } from '@nestjs/common';
import { MfaAuthService } from './mfa-auth.service';

@Controller('mfa-auth')
export class MfaAuthController {
  constructor(private readonly mfaAuthService: MfaAuthService) {}
}
