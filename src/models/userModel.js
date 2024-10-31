import { PrismaClient } from "@prisma/client"
import { z } from 'zod'

const prisma = new PrismaClient()

const userSchema = z.object({
    id:
        z.number({ message: "O ID deve ser um numero inteiro" })
        .positive({ message: "O ID deve ser um numero inteiro" }),
    
    name:
        z.string({ message: "O nome deve ser uma string" })
        .min(3, { message: "O nome deve ter no minimo 3 caracteres" })
        .max(100, { message: "O nome deve ter no maximo 100 caracteres" }),
    
    email:
        z.string({ message: "O email deve ser uma string" })
        .email({ message: "O campo deve ser um email" })
        .max(200, { message: "O email deve ter no maximo 200 caracteres" }),
    
    pass:
        z.string({
        required_error: "Senha é obrigatória",
        invalid_type_error: "Senha deve ser uma string"
    })
    .min(6, {message: "A senha deve ter no minimo 6 caracteres"})
    .max(256, {message: "A senha deve ter no maximo 256 caracteres"})
})

export const validateUser = (user) => {
    return userSchema.safeParse(user)
}

export const validateUserToCreate = (user) => {
    const partialUserSchema = userSchema.partial({
        id:true
    })

    return partialUserSchema.safeParse(user)
}

export const validateUserToLogin = (user) => {
    const partialUserSchema = userSchema.partial({
        id: true,
        name: true
    })

    return partialUserSchema.safeParse(user)
}

export const getAll = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    })
    return users
}

export const getById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })
    return user
}

export const getByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user
}

export const create = async (user) => {
    const result = await prisma.user.create({
        data: user,
        // {
        //     name: user.name,
        //     email: user.email,
        //     pass: user.pass
        // },
        select: {
            id: true,
            name: true,
            email: true
        }
    })
    return result
}

export const remove = async (id) => {
    const user = await prisma.user.delete({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })
    return user
}

export const update = async (user) => {
    const result = await prisma.user.update({
        
        where: {
            id: user.id
        },
        data: user,
        // {
        //     name: user.name,
        //     email: user.email,
        //     pass: user.pass
        // },
        select: {
            id: true,
            name: true,
            email: true
        }
    })
    return result
}

