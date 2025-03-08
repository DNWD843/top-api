import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

// eslint-disable-next-line @typescript-eslint/require-await
export function getJWTConfig(configService: ConfigService): JwtModuleOptions {
    return {
        secret: configService.get('JWT_SECRET'),
    }
}
