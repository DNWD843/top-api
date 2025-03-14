import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TopPageModule } from './top-page/top-page.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        TopPageModule,
        ProductModule,
        ReviewModule,
        MongooseModule.forRoot('mongodb://localhost:27017/top-api-db'),
        FilesModule,
        SitemapModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
