import { IFile } from "./file";

export interface IFileRepository {
    createFile: (internalFileName: string, userFileName: string, FileSize: number, filePath: string, userId: string) => Promise<IFile | undefined>
}