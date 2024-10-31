import { Response, NextFunction } from "express";
import { IAuthRequest } from "type/authRequest";
import { IRepository } from "type/repository";
import archiver from 'archiver';
import fs from 'fs';

export const fileController = {
    uploadFile: (repositories: IRepository) => {
        return async (req: IAuthRequest, res: Response, next: NextFunction) => {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            try {
                const userRepository = repositories.userRepository
                const user = await userRepository.getOneUserById(req.auth?.userId);
                const remainingSpace = 2e+9 - user.occupied_space //in octets
                if (remainingSpace < req.file.size) {
                    res.status(413).json({error: "Insufficient space on the server"})
                } 
                const tempFilePath = req.file.path;
                const internalFileName = req.file.originalname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
                const zipFilePath = `uploads/${internalFileName}.zip`
                const output = fs.createWriteStream(zipFilePath);
                const archive = archiver('zip', {
                    zlib: { level: 9 }
                });
                archive.pipe(output);
                archive.file(tempFilePath, { name: req.file.originalname });
                await archive.finalize();
                fs.unlinkSync(tempFilePath);
                const fileRepository = repositories.fileRepository
                const file = await fileRepository.createFile(internalFileName, req.file.originalname, req.file.size, zipFilePath, req.auth?.userId)
                res.status(200).json(file)
            } catch (e) {
                res.status(400);
            }
            }
        },
    deleteFile: (repositories: IRepository) => async (req: IAuthRequest, res: Response, next: NextFunction) => {
            try {
                const fileRepository = repositories.fileRepository
                const file = await fileRepository.getFileById(req.params.id)
                if (!file || file.user_id!== req.auth?.userId) {
                    return res.status(404).json({ message: 'File not found or not owned by user' });
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
                    return res.status(404).json({ message: 'Files not found' });
                }
                res.status(200).json(files);
            } catch (e) {
                res.status(400);
            }
        }
}