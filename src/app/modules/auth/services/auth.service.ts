import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/data/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../data/dtos/token.dto';
import { JwtPayload } from '../data/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getUserPayload(username: string, pass: string): Promise<JwtPayload> {
    const findedUser = await this.userRepository.findOneBy({
      username: username,
      password: pass,
    });
    if (findedUser) {
      //note hide password
      const { password, isActive, ...user } = findedUser;
      return user;
    }

    return null;
  }

  async getAccessToken(jwtPayload: JwtPayload): Promise<TokenDto> {
    if (!jwtPayload) {
      throw new UnauthorizedException('Jwt payload does not empty!');
    }

    return {
      token: this.jwtService.sign(jwtPayload),
    };
  }
}
