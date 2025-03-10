import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateReviewDto } from './dto'
import { ReviewService } from './review.service'
import { REVIEW_NOT_FOUND } from './review.constants'
import { JwtAuthGuard } from '../auth/guards'
import { IdValidationPipe } from '../pipes'

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return await this.reviewService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedDoc = await this.reviewService.delete(id)

        if (!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }

    @Get('byProduct/:productId')
    async get(@Param('productId', IdValidationPipe) productId: string) {
        return await this.reviewService.findByProductId(productId)
    }
}
