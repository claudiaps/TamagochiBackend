import prisma from "./prisma"

export const createUser = (user: {email: string, password: string}) => {
   return prisma.user.create({data: user})
}

export const findByEmail = (email: string) => {
   return prisma.user.findFirst({
      where: {email}
   })
}