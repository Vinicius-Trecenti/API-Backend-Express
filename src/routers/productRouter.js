import express from 'express'
import productList from '../controllers/product/productList.js'
import productByID from '../controllers/product/productByID.js'
import createProduct from '../controllers/product/createProduct.js'
import editProduct from '../controllers/product/editProduct.js'
import deleteProduct from '../controllers/product/deleteProduct.js'
import editPhotoProduct from '../controllers/product/editPhotoProduct.js'

const router = express.Router()

router.get('/', productByID)

router.get('/list', productList)

router.post('/', createProduct)

router.put('/', editProduct)

router.patch('/', editPhotoProduct)

router.delete('/', deleteProduct)

export default router