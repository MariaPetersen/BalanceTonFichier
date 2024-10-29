import { Router } from 'express'
import { userController } from "./../controller/userController"
import { checkSchema } from 'express-validator'
import { userSchema } from '../schema/userSchema'
import { IUserRepository } from '../type/userRepository'

export function getUserRoutes(userRepository: IUserRepository): Router {
    const router = Router()
    router.post('/signup', checkSchema(userSchema), userController.signup(userRepository))

    // router.get('/:id(\\d+)', getOne(app))

    // router.get('/private', (req, res, next) => {
    //     res.download("./public/image.png")
    // })


    return router
}