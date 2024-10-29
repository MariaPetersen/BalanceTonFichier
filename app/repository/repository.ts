import { IRepository } from "../type/repository"
import { Connection } from 'mysql2/promise'
import { getFileRepository } from "./fileRepository"
import { getUserRepository } from "./userRepository"

export function getRepositories(database: Connection): IRepository {
    return {
        userRepository: getUserRepository(database),
        fileRepository: getFileRepository(database)
    }
}