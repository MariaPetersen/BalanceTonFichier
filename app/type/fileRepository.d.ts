import { IFile } from "./file";

export interface IFileRepository {
    createFile: (internalFileName: string, userFileName: string, FileSize: number, filePath: string, userId: string) => Promise<IFile | undefined>;
    getFileById: (fileId: string) => Promise<IFile | undefined>;
    deleteFile: (fileId: string) => Promise<void>;
    getFilesByUserId: (userId: string) => Promise<IFile[] | undefined>;
}