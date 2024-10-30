import { IUser } from './user';

export interface IUserRepository {
    getOneUserByEmail(email: string): Promise<IUser | undefined>;
    getOneUserById(id: string): Promise<IUser | undefined>;
    createUser(email: string, hashedPassword: string): Promise<IUser | undefined>;
}