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
                console.log(req.file.size)
                const file = await fileRepository.createFile(internalFileName, req.file.originalname, req.file.size, zipFilePath, req.auth?.userId)
                res.status(200).json(file)
            } catch (e) {
                res.status(400);
            }
            }
        }
}