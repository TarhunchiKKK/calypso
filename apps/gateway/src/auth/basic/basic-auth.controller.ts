import { Controller } from '@nestjs/common';
import { BasicAuthService } from './basic-auth.service';

@Controller('basic-auth')
export class BasicAuthController {
  constructor(private readonly basicAuthService: BasicAuthService) {}
}
