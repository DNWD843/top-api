import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { CreateReviewDto } from 'src/review/dto'
import { Types } from 'mongoose'
import { disconnect } from 'mongoose'
import { REVIEW_NOT_FOUND } from '../src/review/review.constants'
import { AuthDto } from 'src/auth/dto'

const productId = new Types.ObjectId().toHexString()

const testDto: CreateReviewDto = {
    name: 'Тест создания отзыва',
    title: 'Заголовок теста',
    description: 'Описание теста',
    rating: 5,
    productId,
}

const loginDto: AuthDto = {
    login: 'dima2@mail.ru',
    password: '123456',
}

describe('AppController (e2e)', () => {
    let app: INestApplication<App>
    let createdId: string
    let access_token: string

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()

        const response = await request(app.getHttpServer()).post('/auth/login').send(loginDto)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        access_token = response.body.access_token
    })

    it('/review/create (POST) - SUCCESS', async () => {
        const response = await request(app.getHttpServer()).post('/review/create').send(testDto).expect(201)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        createdId = response.body._id as string
        expect(createdId).toBeDefined()
    })

    it('/review/byProduct/:productId (GET) - SUCCESS', async () => {
        const response = await request(app.getHttpServer()).get(`/review/byProduct/${productId}`).expect(200)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(response.body.length).toBeGreaterThan(0)
    })

    it('/review/:id (DELETE) - SUCCESS', async () => {
        await request(app.getHttpServer()).delete(`/review/${createdId}`).set('Authorization', `Bearer ${access_token}`).expect(200)
    })

    it('/review/byProduct/:productId (GET) - FAIL', async () => {
        const response = await request(app.getHttpServer()).get(`/review/byProduct/${new Types.ObjectId().toHexString()}`).expect(200)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(response.body.length).toBe(0)
    })

    it('/review/:id (DELETE) - FAIL', async () => {
        await request(app.getHttpServer())
            .delete(`/review/${new Types.ObjectId().toHexString()}`)
            .set('Authorization', `Bearer ${access_token}`)
            .expect(404, { statusCode: 404, message: REVIEW_NOT_FOUND })
    })

    afterAll(async () => {
        await disconnect() // Закрываем соединение с базой данных
        await app.close() // Закрываем приложение
    })
})
