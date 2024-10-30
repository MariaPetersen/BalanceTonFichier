import jwt from "jsonwebtoken"

export interface IUserToken extends jwt.JwtPayload {
    userId?: string;
    exp?: number;
    filesIds?: number[]
}