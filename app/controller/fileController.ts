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
                console.log(file)
                if (!file || file.user_id!== req.auth?.userId) {
                    return res.status(404).json({ message: 'File not found or not owned by user' });
                }
                fs.unlinkSync(file.file_path)
                await fileRepository.deleteFile(req.params.id)
                res.status(200).json({ message: 'File deleted successfully' });
            } catch (e) {
                res.status(400);
            }
        }
}