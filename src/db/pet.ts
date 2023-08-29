import prisma from "./prisma"

export const createPet = (pet: {
   name: string
   userId: number
   restLevel?: number
   foodLevel?: number
   funLevel?: number}) => {
      return prisma.pet.create({data: pet})
}

export const getPetById = (petId: number, userId: number) => {
   return prisma.pet.findFirst({where: {userId, id: petId, deletedAt: null}})
}

export const updatePet = async (pet: {   
   id: number, 
   name?: string;
   lastGet?: Date;
   restLevel?: number;
   foodLevel?: number;
   funLevel?: number;
   life?: number;
}) => {
      const databasePet = await prisma.pet.findFirst({where: {id: pet.id}})
      return prisma.pet.update({where: {id: pet.id}, data: {...databasePet, ...pet}})
}

export const deletePet = async (petId: number) => {
   const pet = await prisma.pet.findFirst({where: {id: petId}})
   return prisma.pet.update({where: {id: petId}, data: {...pet, deletedAt: new Date()}})
}

export const getPets = async (userId: number) => {
   return prisma.pet.findMany({where: {userId, deletedAt: null}})
}
