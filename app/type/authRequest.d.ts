import { Request } from "express";
import { IUser } from "./user";

export interface IAuthRequest extends Request {
  auth?: {
    userId: string;
  };
  user?: IUser;
}