import { Router } from 'express'
import { IFileRepository } from '../type/fileRepository'
import { fileController } from './../controller/fileController'
import { auth } from './../middleware/auth'
import { IRepository } from 'type/repository'
import multer from 'multer'


export function getFileRoutes(repositories: IRepository) {
    const upload = multer({ dest: 'temp/' });
    const router = Router()
    router.post("/upload", auth, upload.single("file"), fileController.uploadFile(repositories))
    return router
}