import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthDto } from './dto'
import { AuthService } from './auth.service'
import { USER_IS_REGISTERED_ERROR } from './auth.constants'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto) {
        const foundUser = await this.authService.findUser(dto.login)

        if (foundUser) {
            throw new BadRequestException(USER_IS_REGISTERED_ERROR)
        }

        return await this.authService.createUser(dto)
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto) {}
}
