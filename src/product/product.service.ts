import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ProductDocument, ProductModel } from './product.model'
import { Model } from 'mongoose'
import { CreateProductDto, FindProductDto } from './dto'
import { ReviewModel } from '../review/review.model'
import { COLLECTION } from '../constants'

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel.name) private readonly productModel: Model<ProductDocument>) {}

    async create(dto: CreateProductDto) {
        return this.productModel.create(dto)
    }

    async findById(id: string) {
        return this.productModel.findById(id).exec()
    }

    async deleteById(id: string) {
        return this.productModel.findByIdAndDelete(id).exec()
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    async findWithReviews(dto: FindProductDto) {
        return this.productModel
            .aggregate([
                { $match: { categories: dto.category } },
                { $sort: { _id: 1 } },
                { $limit: dto.limit },
                {
                    $lookup: {
                        from: COLLECTION.REVIEWS.NAME,
                        localField: '_id',
                        foreignField: 'productId',
                        as: 'reviews',
                    },
                },
                {
                    $addFields: {
                        reviewCount: { $size: '$reviews' },
                        reviewAvg: { $avg: '$reviews.rating' },
                        reviews: {
                            $function: {
                                body: `function (reviews) {
                                    return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                }`,
                                args: ['$reviews'],
                                lang: 'js',
                            },
                        },
                    },
                },
            ])
            .exec() as unknown as Array<
            ProductModel & {
                reviews: ReviewModel[]
                reviewCount: number
                reviewAvg: number
            }
        >
    }
}
