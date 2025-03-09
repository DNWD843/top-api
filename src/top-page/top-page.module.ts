import { Module } from '@nestjs/common'
import { TopPageController } from './top-page.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { TopPageModel, TopPageSchema } from './top-page.model'
import { COLLECTION } from '../constants'

@Module({
    controllers: [TopPageController],
    imports: [MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema, collection: COLLECTION.TOP_PAGE.NAME }])],
})
export class TopPageModule {}
