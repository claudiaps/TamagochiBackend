import { Router, Request, Response } from "express";
import z from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, findByEmail } from "../db/user";

const router = Router()

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

router.post('/register', async (req: Request, res: Response, next) => {
    try {
        const user = RegisterSchema.parse(req.body)
        const hash = bcrypt.hashSync(user.password, 10);
        await createUser({...user, password: hash})
        res.json({
            message: "Usuario criado com sucesso"
        })
    } catch(error) {
        next(error)
    }

})

router.post('/login', async (req: Request, res: Response, next) => {
    try {
        const user = RegisterSchema.parse(req.body)
        console.log(user)
        const databaseUser = await findByEmail(user.email)
        if (databaseUser) {
            const matchPassword = bcrypt.compareSync(user.password, databaseUser.password)
            if (matchPassword) {
                var token = jwt.sign(databaseUser, 'shhhhh');
                return res.json({
                    token,
                })
            }
        } 

        return res.status(401).json({
            message: "Dados inválidos"
        })
        
    } catch(error) {
        next(error)
    }
})

export default router