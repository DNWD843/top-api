import { Module } from '@nestjs/common'
import { TopPageController } from './top-page.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { TopPageModel, TopPageSchema } from './top-page.model'
import { COLLECTION } from '../constants'
import { TopPageService } from './top-page.service';

@Module({
    controllers: [TopPageController],
    imports: [MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema, collection: COLLECTION.TOP_PAGE.NAME }])],
    providers: [TopPageService],
    exports: [TopPageService]
})
export class TopPageModule {}
