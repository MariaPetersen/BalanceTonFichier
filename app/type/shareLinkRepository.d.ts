import { IShareLink } from "./shareLink";

export interface IShareLinkRepository {
    createShareLink(shareLink: string, expiration_date: number, userId: number): Promise<IShareLink | undefined>;
    getShareLink(id: string): Promise<IShareLink | undefined>
}