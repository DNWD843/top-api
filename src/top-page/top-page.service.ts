import { Injectable } from '@nestjs/common'
import { TopLevelCategory, TopPageDocument, TopPageModel } from './top-page.model'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
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

    async findAll() {
        return this.topPageModel.find({}).exec()
    }

    async findByCategory(firstCategory: TopLevelCategory) {
        // return this.topPageModel.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec()
        // or like this
        // return this.topPageModel.find({ firstCategory }, 'alias secondCategory title').exec()
        // *********************************************************************************************** //
        // добавим группировку и агрегацию страниц:
        // return this.topPageModel
        //     .aggregate([
        //         {
        //             $match: { firstCategory },
        //         },
        //         {
        //             $group: {
        //                 _id: { secondCategory: '$secondCategory' }, // $secondCategory - доступно нам в артефакте от предыдущего шага пайпланаб _id - обязательное поле
        //                 pages: { $push: { alias: '$alias', title: '$title' } }, // pages - [{ alias: 'page_alias', title: 'page_title' }]
        //             },
        //         },
        //     ])
        //     .exec()
        // or like this
        return this.topPageModel
            .aggregate()
            .match({ firstCategory })
            .group({
                _id: { secondCategory: '$secondCategory' },
                pages: { $push: { alias: '$alias', title: '$title' } },
            })
            .exec()
    }

    async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec()
    }

    async updateById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
    }
}
