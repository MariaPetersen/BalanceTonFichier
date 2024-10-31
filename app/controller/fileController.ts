import { Response, NextFunction } from "express";
import { IAuthRequest } from "type/authRequest";
import { IRepository } from "type/repository";
import { constants } from "./../utils/constants";
import { createZipFile } from "./../utils/helper"
import fs from 'fs';

export const fileController = {
    uploadFile: (repositories: IRepository) => async (req: IAuthRequest, res: Response, next: NextFunction) => {
            if (!req.file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }
            try {
                const userRepository = repositories.userRepository
                const user = await userRepository.getOneUserById(req.auth?.userId);
                const remainingSpace = constants.MAX_SPACE - user.occupied_space //in octets
                if (remainingSpace < req.file.size) {
                    res.status(413).json({error: "Insufficient space on the server"})
                    return;
                } 
                const tempFilePath = req.file.path;
                const zipFile = await createZipFile(tempFilePath, req.file.originalname)
                const fileRepository = repositories.fileRepository
                const file = await fileRepository.createFile(zipFile.name, req.file.originalname, req.file.size, zipFile.path, req.auth?.userId)
                res.status(200).json(file)
            } catch (e) {
                res.status(400);
            }
        },
    deleteFile: (repositories: IRepository) => async (req: IAuthRequest, res: Response, next: NextFunction) => {
            try {
                const fileRepository = repositories.fileRepository
                const file = await fileRepository.getFileById(req.params.id)
                if (!file || file.user_id!== req.auth?.userId) {
                    res.status(404).json({ message: 'File not found or not owned by user' });
                    return;
                }
                fs.unlinkSync(file.file_path)
                await fileRepository.deleteFile(req.params.id)
                res.status(200).json({ message: 'File deleted successfully' });
            } catch (e) {
                res.status(400);
            }
        },
    getUserFiles: (repositories: IRepository) => async (req: IAuthRequest, res: Response, next: NextFunction) => {
            try {
                const fileRepository = repositories.fileRepository
                const files = await fileRepository.getFilesByUserId(req.auth?.userId)
                if (!files) {
                    res.status(404).json({ message: 'Files not found' });
                    return
                }
                res.status(200).json(files);
            } catch (e) {
                res.status(400);
            }
        }
}