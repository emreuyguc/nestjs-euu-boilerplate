import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../data/jwt-payload';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  async validate(username: string, password: string): Promise<JwtPayload> {
    const user = await this.authService.getUserPayload(username, password);
    if (!user) {
      throw new BadRequestException('User not exists!');
    }
    return user;
  }
}
