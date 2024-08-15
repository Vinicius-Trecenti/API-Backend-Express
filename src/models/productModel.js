import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAll = async () => {
    const products = await prisma.product.findMany()
    return products
}