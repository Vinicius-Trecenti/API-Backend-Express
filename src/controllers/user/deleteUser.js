import { remove } from "../../models/userModel.js"
const deleteUser = async (req, res) => {
    const { id } = req.params

    const user = await remove(+id)

    if (!user) {
        return res.status(404).json({
            error: "Usuario não encontrado"
        })
    }
    
    return res.json({
        message: "user removido",
        user: user
    })
}

export default deleteUser