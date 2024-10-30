import { Connection } from "mysql2/promise";
import { IFileRepository } from "./../type/fileRepository";
import { IFile } from "./../type/file";

export function getFileRepository(database: Connection): IFileRepository {
    return {
        createFile: async (internalFileName: string, userFileName: string, fileSize: number, filePath: string, userId: string) => {
            const createFileQuery =
                "INSERT INTO File (user_id, file_name, user_file_name, file_size, file_path) VALUES (?, ?, ?, ?, ?) RETURNING user_id, file_name, user_file_name, file_size, file_path";
            try {
                const [results] = await database.query(createFileQuery, [userId, internalFileName, userFileName, fileSize, filePath]);
                console.log(results);
                const file = results as Array<IFile>;
                return file;
            } catch (e) {
                console.error(e + "Could not save file");
            }
        }, 

    }
}
