import { Response, NextFunction } from "express";
import { IAuthRequest } from "./../interfaces/IAuthRequest";
import jtw from "jsonwebtoken";

const KEY = process.env.RANDOM_KEY;

export const auth = (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    const decodedToken = jtw.verify(token, `${process.env.RANDOM_KEY}`);
    console.log("key" + KEY);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(403).json({ error: "unauthorized request." });
  }
};