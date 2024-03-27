import express from 'express'
import ProductManager from '../dao/productManager.js'
const app = express()
const PORT = 3000

app.get('/products', (req,res)=>{
    const {limit} = req.query
    const productos = new ProductManager()
    return res.json ({productos:productos.getProducts()})
})

app.get('/products/:id', (req, res)=>{
    const { productid } = req.params
    const productos = new ProductManager()
    return res.json({producto:productos.getProductById(Number(productid))})
})








app.listen(PORT, ()=> {
    console.log(`Corriendo el servidor en el puerto ${PORT}`)
})