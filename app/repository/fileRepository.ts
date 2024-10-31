import { Connection } from "mysql2/promise";
import { IFileRepository } from "./../type/fileRepository";
import { IFile } from "./../type/file";

export function getFileRepository(database: Connection): IFileRepository {
    return {
        createFile: async (internalFileName: string, userFileName: string, fileSize: number, filePath: string, userId: string) => {
            const createFileQuery =
                "INSERT INTO File (user_id, file_name, user_file_name, file_size, file_path) VALUES (?, ?, ?, ?, ?) RETURNING id, user_id, file_name, user_file_name, file_size, file_path";
            try {
                const [results] = await database.query(createFileQuery, [userId, internalFileName, userFileName, fileSize, filePath]);
                const file = results as unknown as IFile;
                return file;
            } catch (e) {
                console.error(e + "Could not save file");
            }
        }, 
        getFileById: async (fileId: string) => {
            const getoneFileQuery =
                "SELECT user_id, file_name, user_file_name, file_size, file_path FROM File WHERE id =?";
            try {
                const [results] = await database.query(getoneFileQuery, [fileId]);
                const file = results as Array<IFile>;
                return file[0];
            } catch (e) {
                console.error(e + "Could not retrieve file");
            }
        },
        getFilesByIds: async (filesIds: string[]) => {
            const getFilesQuery =
                `SELECT file_path, user_file_name FROM File WHERE id IN (${filesIds.join(',')})`;
            try {
                const [results] = await database.query(getFilesQuery);
                const files = results as Array<IFile>;
                return files;
            } catch (e) {
                console.error(e + "Could not retrieve files");
            }
        },
        deleteFile: async (fileId: string) => {
            const deleteFileQuery =
                "DELETE FROM File WHERE id =?";
            try {
                await database.query(deleteFileQuery, [fileId]);
            } catch (e) {
                console.error(e + "Could not delete file");
            }
        },
        getFilesByUserId: async (userId: string) => {
            const getFilesQuery =
                "SELECT id, user_id, file_name, user_file_name, file_size, file_path FROM File WHERE user_id =?";
            try {
                const [results] = await database.query(getFilesQuery, [userId]);
                const files = results as Array<IFile>;
                return files;
            } catch (e) {
                console.error(e + "Could not retrieve files");
            }
        }
    }
}
