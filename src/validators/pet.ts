import z from 'zod'

export const PetSchema = z.object({
    name: z.string(),
    userId: z.number().optional(),
    restLevel: z.number().optional(),
    foodLevel: z.number().optional(),
    funLevel : z.number().optional(),
    deletedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    lastGet  : z.date().optional(),
    createdAt: z.date().optional(),
})