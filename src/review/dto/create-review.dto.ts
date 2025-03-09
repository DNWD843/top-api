import { Transform } from 'class-transformer'
import { IsNumber, IsString, Max, Min } from 'class-validator'
import { Types } from 'mongoose'
import { IsObjectId } from '../../decorators'

export class CreateReviewDto {
    @IsString()
    name: string

    @IsString()
    title: string

    @IsString()
    description: string

    @Min(1, { message: 'Рейтинг не может быть менее 1' })
    @Max(5, { message: 'Рейтинг не может быть более 5' })
    @IsNumber()
    rating: number

    @IsObjectId() // Кастомный декоратор для валидации ObjectId
    @Transform(({ value }: { value: string }) => Types.ObjectId.createFromHexString(value)) // Преобразование строки в ObjectId
    productId: Types.ObjectId
}
