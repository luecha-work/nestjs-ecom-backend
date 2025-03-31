import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Users } from '../../../db/entities/Users';

export const GetUser = createParamDecorator(
  
  (_data, ctx: ExecutionContext): Users => {
    const logger = new Logger();
    const request = ctx.switchToHttp().getRequest();

    logger.debug('request.user', JSON.stringify(request.user));

    return request.user;
  },
);
