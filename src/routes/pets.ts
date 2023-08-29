import { Router, Request, Response } from "express";
import validateToken from "../middleware/auth";
import { createPet, deletePet, getPetById, getPets, updatePet } from "../db/pet";
import { PetSchema } from "../validators/pet";
import { differenceInMinutes } from "date-fns";

const router = Router()

const updatePetLevels = async(pet: any) => {
    const currentDate = new Date();
    const lastGet = new Date(pet.lastGet)
    const minutesDifference = differenceInMinutes(currentDate, lastGet)
    console.log({lastGet, currentDate, minutesDifference, food: minutesDifference * 0.08, petFood: pet.foodLevel})
    const newFoodLevel = pet.foodLevel - (0.08 * minutesDifference)
    const newRestLevel = pet.restLevel - (0.09 * minutesDifference)
    const newFunLevel = pet.funLevel - (0.07 * minutesDifference)
    const newLifeLevel = (newFoodLevel + newRestLevel + newFunLevel) / 3
    
    return await updatePet({
        ...pet,
        foodLevel: newFoodLevel ,
        restLevel: newRestLevel,
        funLevel: newFunLevel,
        lastGet: currentDate,
        life: newLifeLevel
    })
}

router.post('/pet', validateToken ,async (req: Request, res: Response) => {
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

router.put('/pet/:id', validateToken,async (req: Request, res: Response) => {
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
        
        const updatedPet = await updatePet({id: Number(petId), name: pet.name}) 
    
        res.json({
            ...updatedPet
        })
        
    } catch(error) {
        res.status(400).json({
            message: "Dados inválidos"
        })
    }
})

router.delete('/pet/:id', validateToken,async (req: Request, res: Response) => {
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

router.get('/pets', validateToken, async (req: Request, res: Response) => {
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

router.get('/pet/:id', validateToken, async (req: Request, res: Response) => {
    try {
        const {id: userId} = res.locals.user
        const {id: petId} = req.params
        const pet = await getPetById(Number(petId), userId)
        if (!pet) {
            return res.status(404).json({
                message: "Pet não encontrado"
            })
        }
        
        const updatedPet = await updatePetLevels(pet)
        res.status(200).json({
            ...updatedPet
        })
        
    } catch(error) {
        console.log(error)
        res.status(400).json({
            message: "Ocorreu um erro"
        })
    }
    
})

router.post('/pet/:id/food', validateToken, async (req: Request, res: Response) => {
    try {
        const {id: userId} = res.locals.user
        const {id: petId} = req.params
        const pet = await getPetById(Number(petId), userId)

        if (!pet) {
            return res.status(404).json({
                message: "Pet não encontrado"
            })
        }

        await updatePetLevels(pet)
        const updatedPet = await updatePet({id: Number(petId), foodLevel: pet.foodLevel < 90 ? pet.foodLevel + 10 : 100})
        
        res.status(200).json({
            ...updatedPet
        })

    } catch(error) {
       res.status(400).json({
            message: "Dados inválidos"
        })
    }

})

router.post('/pet/:id/rest', validateToken, async (req: Request, res: Response) => {
    try {
        const {id: userId} = res.locals.user
        const {id: petId} = req.params
        const pet = await getPetById(Number(petId), userId)

        if (!pet) {
            return res.status(404).json({
                message: "Pet não encontrado"
            })
        }

        await updatePetLevels(pet)
        const updatedPet = await updatePet({id: Number(petId), restLevel: pet.restLevel < 90 ? pet.restLevel + 10 : 100})

        res.status(200).json({
            ...updatedPet
        })

    } catch(error) {
       res.status(400).json({
            message: "Dados inválidos"
        })
    }

})

router.post('/pet/:id/play', validateToken, async (req: Request, res: Response) => {
    try {
        const {id: userId} = res.locals.user
        const {id: petId} = req.params
        const pet = await getPetById(Number(petId), userId)

        if (!pet) {
            return res.status(404).json({
                message: "Pet não encontrado"
            })
        }

        await updatePetLevels(pet)
        const updatedPet = await updatePet({id: Number(petId), funLevel: pet.funLevel < 90 ? pet.funLevel + 10 : 100})
        res.status(200).json({
            ...updatedPet
        })

    } catch(error) {
       res.status(400).json({
            message: "Dados inválidos"
        })
    }

})

export default router