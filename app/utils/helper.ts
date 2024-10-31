import fs from 'fs';
import archiver from 'archiver';
import { IZipFile } from 'type/zipFile'
import { constants } from 'utils/constants'
import { IRepository } from 'type/repository'
import { IFile } from 'type/file';

export async function createZipFile(tempFilePath: string, originalName: string): Promise<IZipFile> {
    const internalFileName = `${originalName}-${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const zipFilePath = `uploads/${internalFileName}.zip`;
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip');
    archive.pipe(output);
    archive.file(tempFilePath, { name: originalName });
    archive.finalize().then(() => {fs.unlinkSync(tempFilePath);})
    return {path: zipFilePath, name: internalFileName};
}

export function generateShareLink(token: string): string {
    return `${constants.BASE_URL}/shareLink/download/${token}`;
}

export async function verifyAndFetchFiles(
    fileRepository: IRepository["fileRepository"],
    userId: string
) {
    const files: IFile[] = await fileRepository.getFilesByUserId(userId);
    if (!files || files.length === 0) {
        throw new Error("Files not found");
    }
    return files.map(file => file.id);
}