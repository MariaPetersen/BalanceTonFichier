import { Router } from 'express'
import { IFileRepository } from '../type/fileRepository'

export function getFileRoutes(fileRepository: IFileRepository) {
    const router = Router()
    return router
}