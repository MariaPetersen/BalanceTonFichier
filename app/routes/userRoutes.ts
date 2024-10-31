import { Router } from 'express'
import { userController } from "./../controller/userController"
import { checkSchema } from 'express-validator'
import { userSchema } from '../validators/userSchema'
import { IUserRepository } from '../type/userRepository'

export function getUserRoutes(userRepository: IUserRepository): Router {
    const router = Router()
    router.post('/signup', checkSchema(userSchema), userController.signup(userRepository))
    router.post('/login', checkSchema(userSchema), userController.login(userRepository))
    return router
}