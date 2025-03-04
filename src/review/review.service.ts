import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ReviewDocument, ReviewModel } from './review.model'
import { CreateReviewDto } from './dto'
import { Model } from 'mongoose'

@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewDocument>) {}

    async create(dto: CreateReviewDto): Promise<ReviewDocument> {
        return this.reviewModel.create(dto)
    }

    async delete(id: string): Promise<ReviewDocument | null> {
        return this.reviewModel.findByIdAndDelete(id).exec()
    }

    async findByProductId(productId: string): Promise<ReviewDocument[] | null> {
        return this.reviewModel.find({ productId }).exec()
    }

    async deleteByProductId(productId: string) {
        return this.reviewModel.deleteMany({ productId }).exec()
    }
}
