import { remove } from "../../models/userModel.js"
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await remove(+id)

        return res.json({
            message: "user removido",
            user: user
        })
    }
    catch (error) {
        if (error?.code === 'P2025') {
            return res.status(404).json({
                error: "Usuario não encontrado"
            })
        }
        next(error)
    }
}

export default deleteUser