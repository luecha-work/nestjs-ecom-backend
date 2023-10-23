import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '../../../db/entities/Users';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Users => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
