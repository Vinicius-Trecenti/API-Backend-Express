import { getById } from "../../models/productModel.js"

const productByID = async (req, res) => {

    const { id } = req.params
    
    const product = await getById(+id)

    if (product) {
        return res.json({
            message:
                "produto get by ID",
                product
        })
    }
    else {
        return res.status(404).json({
            message: "Produto não encontrado"
        })
    }
}

export default productByID