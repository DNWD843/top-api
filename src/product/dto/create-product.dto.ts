import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

class ProductCharacteristisDto {
    @IsString()
    name: string

    @IsString()
    value: string
}

export class CreateProductDto {
    @IsString()
    image: string

    @IsString()
    title: string

    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    oldPrice?: number

    @IsNumber()
    credit: number

    @IsString()
    description: string

    @IsString()
    advantages: string

    @IsString()
    disAdvantages: string

    @IsArray()
    @IsString({ each: true })
    categories: string[]

    @IsArray()
    @IsString({ each: true })
    tags: string[]

    @IsArray() // массив
    @ValidateNested() // проверяй элементы массива как объекты
    @Type(() => ProductCharacteristisDto) // которым назначается тип ProductCharacteristisDto
    characteristics: ProductCharacteristisDto[]
}
