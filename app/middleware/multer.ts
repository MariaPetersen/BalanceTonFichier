import multer from "multer";
import path from 'path';
import { IAuthRequest } from "./../type/authRequest";
import { IRepository } from "./../type/repository";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ dest: 'temp/' });

export function uploadTempFile(repositories: IRepository ) {
    return async (req: IAuthRequest, res, next) => {
        const userRepository = repositories.userRepository
        const user = await userRepository.getOneUserById(req.auth?.userId);
        const file = req.file
        if (!user || !file) {
            res.status(404).json({error: "User or file note found"})
        } else {
            const remainingSpace = 2e+9 - user.occupied_space //in octets
            if (remainingSpace < file.size) {
                res.status(413).json({error: "Insufficient space on the server"})
            } else {
                req.user = user;
                upload.single("file")(req, res, next);
            }
        }
    }
}