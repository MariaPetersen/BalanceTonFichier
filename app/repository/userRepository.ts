import { Connection } from "mysql2";
import { IUserRepository } from "./../type/userRepository";
import { IUser } from "type/user";

export function getUserRepository(database: Connection): IUserRepository {
    return {
        getOneUser: async (email: string) => {
            const getoneUserQuery =
                "SELECT user_id, email, password FROM users WHERE email = $1";
            try {
                const [results, fields] = await database.query(getoneUserQuery, [email]);
                const user: Array<IUser> = results.rows;
                return user[0];
            } catch (e) {
                console.log(process.env.PASSWORD);
                console.error(e + "Could not retrieve user");
            }
        }, 
        createUser: async (email: string, hashedPassword: string) => {
            const createUserQuery =
                "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
            try {
                const [results, fields] = await database.query(createUserQuery, [email, hashedPassword]);
                const user: Array<IUser> = results.rows;
                return user[0];
            } catch (e) {
                console.error(e + "Could not create user");
            }
        }
    }
}