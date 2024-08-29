import express from 'express'
import productList from '../controllers/product/productList.js'
import productByID from '../controllers/product/productByID.js'
import createProduct from '../controllers/product/createProduct.js'
import editProduct from '../controllers/product/editProduct.js'
import deleteProduct from '../controllers/product/deleteProduct.js'
import editPhotoProduct from '../controllers/product/editPhotoProduct.js'

const router = express.Router()

router.get('/list', productList)

router.get('/:id', productByID)

router.post('/', createProduct)

router.put('/:id', editProduct)

router.patch('/:id', editPhotoProduct)

router.delete('/:id', deleteProduct)

export default router