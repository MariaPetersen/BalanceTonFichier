import { Router } from 'express'
import { fileController } from './../controller/fileController'
import { auth } from './../middleware/auth'
import { IRepository } from 'type/repository'
import {fileValidator} from '../validators/fileValidator'
import { upload } from './../middleware/multer'


export function getFileRoutes(repositories: IRepository) {
    const router = Router()
    router.post("/upload", auth, upload.single("file"), fileValidator, fileController.uploadFile(repositories))
    router.delete("/delete/:id", auth, fileController.deleteFile(repositories))
    router.get("/userFiles", auth, fileController.getUserFiles(repositories))
    return router
}