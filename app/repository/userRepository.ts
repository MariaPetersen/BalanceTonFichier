import { Connection } from "mysql2/promise";
import { IUserRepository } from "./../type/userRepository";
import { IUser } from "type/user";

export function getUserRepository(database: Connection): IUserRepository {
    return {
        getOneUser: async (email: string) => {
            const getoneUserQuery =
                "SELECT user_id, email, password FROM users WHERE email = ?";
            try {
                const [results] = await database.query(getoneUserQuery, [email]);
                const user = results as Array<IUser>;
                return user[0];
            } catch (e) {
                console.log(process.env.PASSWORD);
                console.error(e + "Could not retrieve user");
            }
        }, 
        createUser: async (email: string, hashedPassword: string) => {
            const createUserQuery =
                "INSERT INTO users (email, password) VALUES (?, ?) RETURNING *";
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