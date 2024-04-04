import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";

import jwt from "jsonwebtoken";

type JWTPayload = {
    id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;

        if (!authorization) {
            throw new UnauthorizedError("NÃO Autorizado!");
        }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JWTPayload;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
            throw new UnauthorizedError("NÃO Autorizado!");
        }

    const {password: _, ...loggedUser} = user;

    req.user = loggedUser;

    next();

}