import { Injectable } from '@nestjs/common'
import { FileUploadResponse } from './dto'
import { format } from 'date-fns'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import * as sharp from 'sharp'
import { MulterFile } from './multerFile.class'

@Injectable()
export class FilesService {
    async saveFiles(files: MulterFile[]): Promise<FileUploadResponse[]> {
        const fileFolderName = format(new Date(), 'yyyy-MM-dd')
        const uploafFolderName = `${path}/uploads/${fileFolderName}`

        await ensureDir(uploafFolderName)

        const response: FileUploadResponse[] = []

        for (const file of files) {
            if (file) {
                const fileName = file.originalname

                await writeFile(`${uploafFolderName}/${fileName}`, file.buffer)
                response.push({
                    url: `${fileFolderName}/${fileName}`,
                    name: fileName,
                })
            }

        }

        return response
    }

    convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer()
    }
}
