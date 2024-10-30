import { Response, NextFunction } from "express";
import { IAuthRequest } from "./../type/authRequest";
import { IRepository } from "./../type/repository";
import jtw from "jsonwebtoken";
import { IUserToken } from "type/userToken";
import archiver from "archiver";

export const shareLinkController = {
    createShareLink: (repositories: IRepository) => async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
            const fileRepository = repositories.fileRepository
            const shareLinkRepository = repositories.shareLinkRepository
            const files = await fileRepository.getFilesByUserId(req.auth?.userId)
            if (!files) {
                return res.status(404).json({ message: 'Files not found' });
            }
            const filesIds = files.map(file => file.id)
            const token = jtw.sign({ filesIds: filesIds }, `${process.env.RANDOM_KEY}`, {
                expiresIn: "7d",
            })
            const decodedToken = jtw.verify(token, `${process.env.RANDOM_KEY}`) as IUserToken
            const expirationDate = decodedToken?.exp && new Date(decodedToken?.exp * 1000)
    
            const shareLink = `http://localhost:8090/shareLink/download/${token}`
            
            const savedLink = await shareLinkRepository.createShareLink(shareLink, expirationDate, req.auth?.userId)
            res.status(200).json(savedLink);
            } catch (e) {
                res.status(400);
            }
        },
    downloadFiles: (repositories: IRepository) => async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
            const fileRepository = repositories.fileRepository
            const token = req.params.token
            const { filesIds, exp } = jtw.verify(token, `${process.env.RANDOM_KEY}`) as IUserToken
            if (!filesIds?.length || !exp) {
                return res.status(404).json({ message: 'Files not found' });
            }
            if (exp > new Date().getTime()){
                return res.status(403).json({ message: 'Link expired' });
            }
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="files.zip"');
            const archive = archiver('zip', { zlib: { level: 9 } });
            archive.pipe(res);
            const files = await fileRepository.getFilesByIds(filesIds)
            files.forEach((file) => {
                archive.file(file.file_path, { name: file.user_file_name });
            });
            archive.finalize();
            archive.on('error', (err) => {
                res.status(500).send({ error: err.message });
            });
            } catch (e) {
                res.status(400);
            }
        },
}