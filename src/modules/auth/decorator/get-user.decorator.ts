import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '../../../db/entities/Users';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Users => {
    const request = ctx.switchToHttp().getRequest();

    console.log('request.user', JSON.stringify(request.user));

    return request.user;
  },
);
