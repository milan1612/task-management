/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthcredentialDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authcredentialDto: AuthcredentialDto): Promise<void> {
    return this.authService.signUp(authcredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body() authcredentialDto: AuthcredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.SignIn(authcredentialDto);
  }
}
