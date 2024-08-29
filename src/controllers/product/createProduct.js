import { create } from "../../models/productModel.js"

const createProduct = async (req, res) => {
    const product = req.body

    const result = await create(product)

    if (!result) {
        return res.status(500).json({
            error: "erro ao criar produto"
        })
    }

    return res.json({
        success: "Produto criado com sucesso!",
        product: result
    })
}

export default createProduct