import { Request, Response } from "express";
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: any) => {
    const token = req.headers["x-access-token"] as string

    if (token) {
        try {
            const decoded = jwt.verify(token, 'shhhhh');
            res.locals.user = decoded
            return next()
        } catch (err) {
            return res.status(401).send("Token inválido");
        }
    }

    return res.status(401).send("Não autorizado");
}

export default validateToken