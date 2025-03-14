import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModel, UserSchema } from './user.model'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from '../configs'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategies'
import { COLLECTION } from '../constants'

@Module({
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema, collection: COLLECTION.USERS.NAME }]),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJWTConfig,
        }),
        PassportModule,
    ],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
