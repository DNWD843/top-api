import { Injectable } from '@nestjs/common'
import { AuthDto } from './dto'
import { UserDocument, UserModel } from './user.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { genSaltSync, hashSync } from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>) {}

    async createUser({ login, password }: AuthDto) {
        const salt = genSaltSync()
        const newUser = new this.userModel({
            email: login,
            passwordHash: hashSync(password, salt),
        })

        return newUser.save()
    }

    async findUser(email: string) {
        return this.userModel.findOne({ email }).exec()
    }
}
