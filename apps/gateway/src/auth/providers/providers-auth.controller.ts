import { Controller } from '@nestjs/common';
import { ProvidersAuthService } from './providers-auth.service';

@Controller('providers-auth')
export class ProvidersAuthController {
  constructor(private readonly providersAuthService: ProvidersAuthService) {}
}
