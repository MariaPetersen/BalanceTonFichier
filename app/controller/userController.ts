import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt"
import jtw from "jsonwebtoken"
import { IUserRepository } from "type/userRepository";

const KEY = process.env.RANDOM_KEY;

export const userController = {
  signup: (userRepository: IUserRepository) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json("Missing parameter, request must include email and password");
    }
    const alreadyExistingUser = await userRepository.getOneUser(email);

    if (alreadyExistingUser) {
      res.status(400).json("Something went wrong during signup");
    }
    const hash: string = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hash);

    res.status(200).json({
      userId: user.user_id,
      token: jtw.sign({ userId: user.user_id }, `${KEY}`, {
        expiresIn: "24h",
      }),
    });
  } catch (e) {
    res.status(400);
  }
}, 
login: (userRepository: IUserRepository) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json("Missing parameter, request must include email and password");
    }
    const user = await userRepository.getOneUser(email);
    const valid = bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
    }
    res.status(201).json({
      userId: user.user_id,
      token: jtw.sign({ userId: user.user_id }, `${KEY}`, {
        expiresIn: "24h",
      }),
    });
  } catch (e) {
    res.status(400).json("Login failed");
  }
}
}