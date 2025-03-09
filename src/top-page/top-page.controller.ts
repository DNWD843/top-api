import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    UsePipes,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common'
import { CreateTopPageDto, FindTopPageDto } from './dto'
import { TopPageService } from './top-page.service'
import { NOT_FOUND_ERROR } from './top-page.constants'
import { IdValidationPipe } from '../pipes'
import { JwtAuthGuard } from 'src/auth/guards'

@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageService: TopPageService) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageService.createTopPage(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const foundTopPage = await this.topPageService.findById(id)

        if (!foundTopPage) {
            throw new NotFoundException(NOT_FOUND_ERROR)
        }

        return foundTopPage
    }

    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const pageFoundByAlias = await this.topPageService.findByAlias(alias)

        if (!pageFoundByAlias) {
            throw new NotFoundException(NOT_FOUND_ERROR)
        }

        return pageFoundByAlias
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedPage = await this.topPageService.deleteById(id)

        if (!deletedPage) {
            throw new NotFoundException(NOT_FOUND_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
        const updatedPage = await this.topPageService.updateById(id, dto)

        if (!updatedPage) {
            throw new NotFoundException(NOT_FOUND_ERROR)
        }

        return updatedPage
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindTopPageDto) {
        return this.topPageService.findByCategory(dto.firstCategory)
    }
}
