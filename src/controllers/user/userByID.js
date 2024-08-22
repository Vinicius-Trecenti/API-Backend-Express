import { getById } from "../../models/userModel.js"

const userByID = async (req, res) => {
    const { id } = req.params

    const user = await getById(+id)
    console.log(id)

    if (user) {
        return res.json({
            message:
                "usuario get by ID",
                user
        })
    }
    else {
        return res.status(404).json({
            message: "User não encontrado"
        })
    }
}

export default userByID