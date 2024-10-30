import { Response, NextFunction } from "express";
import { IAuthRequest } from "../type/authRequest";
import { IUserToken } from "./../type/userToken";
import jtw from "jsonwebtoken";

export const auth = (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
      if (!token){
        res.status(403).json({ error: "Invalid token"})
      } else {
        const decodedToken = jtw.verify(token, `${process.env.RANDOM_KEY}`) as IUserToken
        const userId = decodedToken.userId;
        req.auth = {
          userId: userId,
        };
      }
    next();
  } catch (error) {
    res.status(403).json({ error: "unauthorized request." });
  }
};