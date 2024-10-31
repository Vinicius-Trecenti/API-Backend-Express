import { getByEmail, validateUserToLogin } from "../../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../../config.js"
const login = async (req, res) => {
    try {
        const login = req.body
        const loginValidated = validateUserToLogin(login)

        if (loginValidated?.error) {
            return res.status(400).json({
                error: "Erro ao logar, verifique!",
                fieldErrors: loginValidated.error.flatten().fieldErrors
            })
        }

        //buscar o user pelo email
        const user = await getByEmail(loginValidated.data.email)
        if (user) {
            return res.status(400).json({
                error: "Email ou senha invalidas!",
                fieldErrors: loginValidated.error.flatten().fieldErrors
            })
        }

        //comparar a senha enviada com o hash
        console.log(user)
        const passIsValid = bcrypt.compareSync(loginValidated.data.pass, user.pass)
        
        if (!passIsValid) {
            return res.status(400).json({
                error: "Email ou senha invalidas (senha)!",
                fieldErrors: loginValidated.error.flatten().fieldErrors
            })
        }

        const token = jwt.sign({name: user.name, publicId: user.public_id}, SECRET_KEY, {expiresIn: 60*5})

        console.log(token)
        return res.json({
            success: "Usuario criado com sucesso!",
            user: result
        })
    }
    catch (error) {
        console.log(error)

        if (error?.code == 'P2002') {
            return res.status(400).json({
                error: "Erro ao criar o usuario verifique o erro",
                fieldErrors: {email: ["email ja cadastrado"]}
            })
        }
        // next(error)
    }
    
}

export default login