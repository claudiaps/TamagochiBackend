import { Router, Request, Response } from "express";
import validateToken from "../middleware/auth";
import { createPet, deletePet, getPetById, getPets, updatePet } from "../db/pet";
import { PetSchema } from "../validators/pet";

const router = Router()

router.post('/pet', validateToken ,async (req: Request, res: Response, next) => {
    try {
        const {id: userId} = res.locals.user
        const pet = PetSchema.parse(req.body)
        if (!pet.name) {
            return res.status(400).json({
                message: "Nome do pet não informado"
            })
        }
        const newPet = await createPet({...pet, userId})
        return res.json({
            ...newPet
        })
    } catch(error) {
       res.status(400).json({
            message: "Dados inválidos"
        })
    }

})

router.put('/pet/:id', validateToken,async (req: Request, res: Response, next) => {
    try {
        const pet = PetSchema.parse(req.body)
        if (!pet?.name) {
            return res.status(400).json({
                message: "Informe um nome para o pet"
            })
        }
        
        const {id: petId} = req.params
        const {id: userId} = res.locals.user
        const userPet = await getPetById(Number(petId), userId)
        
        if (!userPet) {
            return res.status(404).json({
                message: "Pet não encontrado"
            })
        }
        
        const updatedPet = await updatePet(Number(petId), pet.name) 
        
        res.json({
            ...updatedPet
        })
        
    } catch(error) {
        res.status(400).json({
            message: "Dados inválidos"
        })
    }
})

router.delete('/pet/:id', validateToken,async (req: Request, res: Response, next) => {
    try {    
        const {id: petId} = req.params
        const {id: userId} = res.locals.user
        const userPet = await getPetById(Number(petId), userId)
      
        if (!userPet) {
            return res.status(404).json({
                message: "Pet não encontrado"
            })
        }

        await deletePet(Number(petId))
        res.status(204).send()

    } catch(error) {
        console.log(error)
        res.status(400).json({
            message: "Ocorreu um erro"
        })
    }
})

router.get('/pets', validateToken, async (req: Request, res: Response, next) => {
    try {
        const {id: userId} = res.locals.user
        const pets = await getPets(userId)
        res.status(200).json({
            pets
        })

    } catch(error) {
        console.log(error)
        res.status(400).json({
            message: "Ocorreu um erro"
        })
    }
    
})

router.get('/pet/:id', validateToken, async (req: Request, res: Response, next) => {
    console.log('shahsa')
    try {
        const {id: userId} = res.locals.user
        const {id: petId} = req.params
        const pet = await getPetById(Number(petId), userId)
        if (!pet) {
            return res.status(404).json({
                message: "Pet não encontrado"
            })
        }

        res.status(200).json({
            ...pet
        })
        
    } catch(error) {
        console.log(error)
        res.status(400).json({
            message: "Ocorreu um erro"
        })
    }
    
})

export default router