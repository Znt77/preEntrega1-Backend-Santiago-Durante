import fs from 'fs'
class ProductManager {
    constructor() {
        this.products = []
        this.productIdCounter = 1
    }
    saveProduct() {
        const data = JSON.stringify(this.products, null, 2)
        fs.writeFileSync('productos.json', data)
        console.log('Productos guardados en productos.json')
    }
    loadProducts() {
        const data = fs.readFileSync('productos.json', 'utf-8')
        this.products = JSON.parse(data)
        console.log('Productos cargados desde productos.json')
    } catch(error) {
        console.error('Error al cargar productos desde productos.json:', (error))
    }
    updateProduct(id, updateField) {
        const index = this.products.findIndex(product => product.id === id)
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updateField }
            this.saveProduct()
            console.log('Producto actualizado:', this.products[index]);
        } else {
            console.error('No se encontró el producto con el ID: ', id);
        }
    }
    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = { ...this.products[index] }
            this.products[index] = { id }
            this.saveProduct()
            console.log('Producto eliminado (excepto ID):', deletedProduct)
        } else {
            console.error('Producto no encontrado con ID:', id);
        }
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios")
            return;
        }
        if (this.products.some(product => product.code === code)) {
            console.error("Ya existe un producto con ese código")
            return;
        }
        const product = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product)
        console.log("Producto agregado:", product)
        this.saveProduct()
    }

    getProducts(limit = 0) {
        limit = Number(limit)
        if (limit > 0)
            return this.products.slice(0, limit)
        else return this.products
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id)
        if (product) {
            console.log("Producto encontrado:", product)
        } else {
            console.log("Producto no encontrado")
        }
        return product
    }
}

// const productManager = new ProductManager()

// productManager.addProduct("Polera a rayas", "Polera 50% algodón 50% polyester", 9.99, "img1.jpg", "Polera01", 27)
// productManager.addProduct("Polera con imágen de tiburón", "Polera 100% algodón", 14.99, "img2.jpg", "Polera02", 11)
// productManager.addProduct("Polera con imágen de perro", "Polera 75% algodón, 25% polyester", 19.99, "img3.jpg", "Polera02", 14) //Ejemplo de error en la parte de code

// productManager.updateProduct(1, { price: 11.99, stock: 30 })

// productManager.deleteProduct(2)

// const allProducts = productManager.getProducts()
// console.log("Todos los productos:", allProducts)

// const productById = productManager.getProductById(1)
// const productNotExists = productManager.getProductById(99999)

export default ProductManager