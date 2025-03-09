import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ProductDocument, ProductModel } from './product.model'
import { Model } from 'mongoose'
import { CreateProductDto } from './dto'

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
}
