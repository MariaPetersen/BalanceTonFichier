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
      return;
    }
    const alreadyExistingUser = await userRepository.getOneUserByEmail(email);

    if (alreadyExistingUser) {
      res.status(400).json("Something went wrong during signup");
      return;
    }
    const hash: string = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hash);

    res.status(200).json({
      userId: user?.id,
      token: jtw.sign({ userId: user?.id }, `${KEY}`, {
        expiresIn: "24h",
      }),
    });
  } catch (e) {
    res.status(500);
  }
}, 
  login: (userRepository: IUserRepository) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res
          .status(400)
          .json("Missing parameter, request must include email and password");
        return;
      }
      const user = await userRepository.getOneUserByEmail(email);
      if (!user) {
        res.status(401).json({ message: "Something went wrong" });
        return;
      } else {
        const valid = bcrypt.compare(password, user.password);
        if (!valid) {
          res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
          return;
        }
        res.status(201).json({
          userId: user.id,
          token: jtw.sign({ userId: user?.id }, `${KEY}`, {
            expiresIn: "24h",
          }),
        });
      }
    } catch (e) {
      res.status(500).json("Login failed");
    }
  }
}