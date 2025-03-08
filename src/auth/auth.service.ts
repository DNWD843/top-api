import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthDto } from './dto'
import { UserDocument, UserModel } from './user.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { genSalt, hash, compare } from 'bcryptjs'
import { INCORRECT_PASSWORD_ERROR, USER_NOT_FOUND_ERROR } from './auth.constants'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async createUser({ login, password }: AuthDto) {
        const salt = await genSalt()
        const newUser = new this.userModel({
            email: login,
            passwordHash: await hash(password, salt),
        })

        return newUser.save()
    }

    async findUser(email: string) {
        return this.userModel.findOne({ email }).exec()
    }

    async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
        const user = await this.findUser(email)

        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
        }

        const isPasswordCorrect = await compare(password, user.passwordHash)

        if (!isPasswordCorrect) {
            throw new UnauthorizedException(INCORRECT_PASSWORD_ERROR)
        }

        return {
            email: user.email,
        }
    }

    async login(email: string) {
        const payload = { email }

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
