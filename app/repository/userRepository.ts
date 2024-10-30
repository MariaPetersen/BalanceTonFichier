import { Connection } from "mysql2/promise";
import { IUserRepository } from "./../type/userRepository";
import { IUser } from "type/user";

export function getUserRepository(database: Connection): IUserRepository {
    return {
        getOneUserByEmail: async (email: string) => {
            const getoneUserQuery =
                "SELECT id, email, password FROM User WHERE email = ?";
            try {
                const [results] = await database.query(getoneUserQuery, [email]);
                const user = results as Array<IUser>;
                return user[0];
            } catch (e) {
                console.error(e + "Could not retrieve user");
            }
        }, 
        getOneUserById: async (id: string) => {
            const getoneUserQuery =
                "SELECT id, email, password FROM User WHERE id = ?";
            try {
                const [results] = await database.query(getoneUserQuery, [id]);
                const user = results as Array<IUser>;
                return user[0];
            } catch (e) {
                console.error(e + "Could not retrieve user");
            }
        }, 
        createUser: async (email: string, hashedPassword: string) => {
            const createUserQuery =
                "INSERT INTO User (email, password) VALUES (?, ?) RETURNING id, email, password";
            try {
                const [results] = await database.query(createUserQuery, [email, hashedPassword]);
                const user = results as Array<IUser>;
                return user[0];
            } catch (e) {
                console.error(e + "Could not create user");
            }
        }
    }
}