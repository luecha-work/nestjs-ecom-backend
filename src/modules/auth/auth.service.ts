import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async userId(request: Request): Promise<number> {
    const cookie = request.cookies['access_token'];

    const data = await this.jwtService.verifyAsync(cookie);

    return data['id'];
  }
}
