import { Module } from '@nestjs/common'
import { ReviewController } from './review.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ReviewModel, ReviewSchema } from './review.model'
import { ReviewService } from './review.service'
import { COLLECTION } from '../constants'

@Module({
    controllers: [ReviewController],
    imports: [MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema, collection: COLLECTION.REVIEWS.NAME }])],
    providers: [ReviewService],
})
export class ReviewModule {}
