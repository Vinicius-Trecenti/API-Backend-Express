import { update } from "../../models/productModel.js"

const editProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body
    
    product.id = +id

    const result = await update(product)
    
    if (!result) {
        return res.status(500).json({
            error: "Erro ao editar produto"
        })
    }

    return res.json({
        success: "produto atualizado com sucesso",
        product: result
    })
}

export default editProduct