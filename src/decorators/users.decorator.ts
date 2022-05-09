import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserPayload = {
  sub: string;
  name: string;
  email: string;
};

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
