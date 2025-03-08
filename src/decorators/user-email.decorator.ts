import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserEmail = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: { email: string } }>()

    return request.user.email
})
