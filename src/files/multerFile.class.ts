export class MulterFile {
    originalname: string
    buffer: Buffer

    constructor(file: Express.Multer.File | MulterFile) {
        this.originalname = file.originalname
        this.buffer = file.buffer
    }
}
