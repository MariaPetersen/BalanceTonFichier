import { Router } from 'express'
import { auth } from './../middleware/auth'
import { IRepository } from './../type/repository'
import { shareLinkController } from './../controller/shareLinkController'


export function getShareLinkRoutes(repositories: IRepository) {
    const router = Router()
    router.post("/create", auth, shareLinkController.createShareLink(repositories))
    router.get("/download/:token", shareLinkController.downloadFiles(repositories))
    return router
}