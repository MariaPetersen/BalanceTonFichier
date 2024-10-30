import { Response, NextFunction } from "express";
import { IAuthRequest } from "./../type/authRequest";
import { IRepository } from "./../type/repository";
import jtw from "jsonwebtoken";
import { IUserToken } from "type/userToken";

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
            const expirationDate = decodedToken?.exp && new Date(decodedToken?.exp * 100)
    
            const shareLink = `http://localhost:8090/download/${token}`
            
            await shareLinkRepository.createShareLink(shareLink, expirationDate, req.auth?.userId)
            res.status(200).json(shareLink);
            } catch (e) {
                res.status(400);
            }
        }
}