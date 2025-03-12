import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards';
import { FileUploadResponse } from './dto';
import { FilesService } from './files.service';
import { MulterFile } from './multerFile.class';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileUploadResponse[]> {
        const resultArray: MulterFile[] = [new MulterFile(file)]

        if (file.mimetype.includes('image')) {
            const webPBuffer = await this.filesService.convertToWebP(file.buffer)

            resultArray.push(new MulterFile({
                originalname: `${file.originalname.split('.').slice(0, -1).join('.')}.webp`,
                buffer: webPBuffer,
            }))
        }



        return this.filesService.saveFiles(resultArray)

    }
}
