import { Router } from 'express'
import { IFileRepository } from '../type/fileRepository'
import { fileController } from './../controller/fileController'
import { auth } from './../middleware/auth'

export function getFileRoutes(fileRepository: IFileRepository) {
    const router = Router()
    router.post("/upload", auth, fileController.upload(fileRepository))
    return router
}