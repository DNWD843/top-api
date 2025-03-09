import { Injectable } from '@nestjs/common'
import { TopLevelCategory, TopPageDocument, TopPageModel } from './top-page.model'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateTopPageDto } from './dto'

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageDocument>) {}

    async createTopPage(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto)
    }

    async findById(id: string) {
        return this.topPageModel.findById(id).exec()
    }

    async findByAlias(alias: string) {
        return this.topPageModel.findOne({ alias }).exec()
    }

    async findByCategory(firstCategory: TopLevelCategory) {
        // return this.topPageModel.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec()
        return this.topPageModel.find({ firstCategory }, 'alias secondCategory title').exec()
    }

    async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec()
    }

    async updateById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }
}
