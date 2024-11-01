import { Connection } from "mysql2/promise";
import { IShareLinkRepository } from "./../type/shareLinkRepository";
import { IShareLink } from "../type/shareLink";

export function getShareLinkRepository(database: Connection): IShareLinkRepository {
    return {
        createShareLink: async (shareLink: string, expiration_date: number, userId: number) => {
            const createShareLinkQuery = "INSERT INTO shareLink (link, expiration_date, user_id) VALUES (?, ?, ?) RETURNING id, link, expiration_date"
            try {
                const [results] = await database.query(createShareLinkQuery, [shareLink, expiration_date, userId]);
                const link = results as unknown as IShareLink[];
                return link[0];
            } catch (e) {
                console.error(e + "Could not save shareLink");
            }
        },
        getShareLink: async (id: string) => {
            const getShareLinkQuery = "SELECT id, link, expiration_date, user_id FROM shareLink WHERE id =?"
            try {
                const [results] = await database.query(getShareLinkQuery, [id]);
                const link = results as unknown as IShareLink[];
                return link[0];
            } catch (e) {
                console.error(e + "Could not retrieve shareLink");
            }
        }
    }
}
