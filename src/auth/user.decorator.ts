import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const httpContext = ctx.switchToHttp().getRequest();
    const wsContext = ctx.switchToWs().getClient();

    if (httpContext) {
      return httpContext.user;
    } else if (wsContext) {
      return wsContext.user;
    }
  },
);
