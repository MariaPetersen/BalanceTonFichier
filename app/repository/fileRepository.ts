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
                const file = results as Array<IFile>;
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
        deleteFile: async (fileId: string) => {
            const deleteFileQuery =
                "DELETE FROM File WHERE id =?";
            try {
                await database.query(deleteFileQuery, [fileId]);
            } catch (e) {
                console.error(e + "Could not delete file");
            }
        }
    }
}
