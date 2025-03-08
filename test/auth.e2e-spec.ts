import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { disconnect } from 'mongoose'
import { AuthDto } from '../src/auth/dto'
import { INCORRECT_PASSWORD_ERROR, USER_NOT_FOUND_ERROR } from '../src/auth/auth.constants'

const loginDto: AuthDto = {
    login: 'dima2@mail.ru',
    password: '123456',
}

describe('AuthController (e2e)', () => {
    let app: INestApplication<App>

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('/auth/login (POST) - SUCCESS', async () => {
        const response = await request(app.getHttpServer()).post('/auth/login').send(loginDto).expect(200)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(response.body.access_token).toBeDefined()
    })

    it('/auth/login (POST) - FAIL: INCORRECT PASSWORD', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: '1' })
            .expect(401, {
                statusCode: 401,
                message: INCORRECT_PASSWORD_ERROR,
                error: 'Unauthorized',
            })
    })

    it('/auth/login (POST) - FAIL: INCORRECT LOGIN', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: 'unknown-user@gmail.com' })
            .expect(401, {
                statusCode: 401,
                message: USER_NOT_FOUND_ERROR,
                error: 'Unauthorized',
            })
    })

    afterAll(async () => {
        await disconnect() // Закрываем соединение с базой данных
        await app.close() // Закрываем приложение
    })
})
