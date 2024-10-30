import { Multer } from "multer";

declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId: string;
            };
            file?: Multer.File;
        }
    }
}