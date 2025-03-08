import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import * as jwt from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(jwt.Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET') ?? '',
        })
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async validate({ email }: { email: string }) {
        /**
         * Валидация происходит в модуле авторизации и тут не нужна.
         * Этот метод объявлен, потому что он обязательный в классе.
         * Поэтому просто пробрасываем email
         */
        return { email }
    }
}
