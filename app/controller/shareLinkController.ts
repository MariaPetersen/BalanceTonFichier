import { Response, NextFunction } from "express";
import { IAuthRequest } from "type/authRequest";
import { IRepository } from "type/repository";
import jtw from "jsonwebtoken";
import { IUserToken } from "type/userToken";
import archiver from "archiver";
import { verifyAndFetchFiles, generateShareLink } from "utils/helper";
import { constants } from "utils/constants";
import unzipper from 'unzipper';

export const shareLinkController = {
    createShareLink: (repositories: IRepository) => async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
            const {fileRepository, shareLinkRepository} = repositories
            const userId = req.auth?.userId;
            const filesIds = userId && await verifyAndFetchFiles(fileRepository, userId)
            const token = jtw.sign({ filesIds: filesIds }, `${process.env.RANDOM_KEY}`, {
                expiresIn: constants.DOWNLOAD_TOKEN_EXPIRATION,
            })
            const decodedToken = jtw.verify(token, `${process.env.RANDOM_KEY}`) as IUserToken
            const expirationDate = decodedToken?.exp && new Date(decodedToken?.exp * 1000)
    
            const shareLink = generateShareLink(token)
            
            const savedLink = await shareLinkRepository.createShareLink(shareLink, expirationDate, req.auth?.userId)
            res.status(200).json(savedLink);
            } catch (e) {
                res.status(500);
            }
        },
    downloadFiles: (repositories: IRepository) => async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
            const fileRepository = repositories.fileRepository
            const token = req.params.token
            const decodedToken = jtw.verify(token, `${process.env.RANDOM_KEY}`) as IUserToken
            const { filesIds, exp } = decodedToken 
            if (!filesIds?.length || !exp) {
                res.status(404).json({ message: 'Files not found' });
                return;
            }
            if (exp > new Date().getTime()){
                res.status(403).json({ message: 'Link expired' });
                return;
            }
            const files = await fileRepository.getFilesByIds(filesIds)
            if (files.length === 0) {
                res.status(404).json({ message: "No files found for download" });
            }
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="files.zip"');

            const archive = archiver('zip', { zlib: { level: 9 } });
            archive.pipe(res);
            for (const file of files) {
                const filePath = file.file_path;
                const directory = await unzipper.Open.file(filePath);
                for (const entry of directory.files) {
                        const entryStream = entry.stream();
                        archive.append(entryStream, { name: entry.path });
                    }
               
            }
            archive.finalize();
            archive.on('error', (err) => {
                res.status(500).send({ error: err.message });
            });
            } catch (e) {
                res.status(500);
            }
        },
    getOneShareLink: (repositories: IRepository) => async (req: IAuthRequest, res: Response, next: NextFunction) => {
        try {
            const shareLinkRepository = repositories.shareLinkRepository
            const id = req.params.id
            const shareLink = await shareLinkRepository.getShareLink(id)
            if (!shareLink) {
                res.status(404).json({ message: 'Share link not found' });
                return;
            }
            console.log(shareLink)
            res.status(200).json(shareLink);
            } catch (e) {
                res.status(500);
            }
    }
}