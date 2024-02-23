"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const httpContext = ctx.switchToHttp().getRequest();
    const wsContext = ctx.switchToWs().getClient();
    if (httpContext) {
        return httpContext.user;
    }
    else if (wsContext) {
        return wsContext.user;
    }
});
//# sourceMappingURL=user.decorator.js.map