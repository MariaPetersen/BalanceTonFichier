import jwt from "jsonwebtoken"

export interface IUserToken extends jwt.JwtPayload {
    userId: string;
}