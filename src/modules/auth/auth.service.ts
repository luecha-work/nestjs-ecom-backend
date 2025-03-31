import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async userId(request: Request): Promise<number> {
    const cookie = request.cookies['access_token'];

    console.log('cookie', cookie);

    const data = await this.jwtService.verifyAsync(cookie);

    console.log('data', JSON.stringify(data));

    return data['id'];
  }
}
