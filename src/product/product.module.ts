import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModel, ProductSchema } from './product.model'
import { ProductService } from './product.service'
import { COLLECTION } from '../constants'

@Module({
    controllers: [ProductController],
    imports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema, collection: COLLECTION.PRODUCTS.NAME }])],
    providers: [ProductService],
})
export class ProductModule {}
