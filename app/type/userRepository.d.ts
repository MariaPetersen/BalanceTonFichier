import { IUser } from './user';

export interface IUserRepository {
    getOneUser(email: string): Promise<IUser | undefined>;
    createUser(email: string, hashedPassword: string): Promise<IUser | undefined>;
}