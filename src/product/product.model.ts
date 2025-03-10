import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ProductDocument = HydratedDocument<ProductModel>

class ProductCharacteristis {
    @Prop()
    name: string

    @Prop()
    value: string
}

@Schema({ timestamps: true })
export class ProductModel {
    @Prop()
    image: string

    @Prop()
    title: string

    @Prop()
    price: number

    @Prop()
    oldPrice?: number

    @Prop()
    credit: number

    @Prop()
    description: string

    @Prop()
    advantages: string

    @Prop()
    disAdvantages: string

    @Prop({ type: [String] })
    categories: string[]

    @Prop({ type: [String] })
    tags: string[]

    @Prop({ type: [ProductCharacteristis], _id: false })
    characteristics: ProductCharacteristis[]
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel)
