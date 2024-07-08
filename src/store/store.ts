import { create } from "zustand"
import { ProductState } from "@/interfaces/product"
import { API_ROUTES, getProducts } from "@/utils/utils"
import axios from "axios"

export const useProductsStore = create<ProductState>((set, get) => ({
  products: [],

  updateProducts: (newProducts) => {
    set({ products: newProducts })
  },

  addProduct: async (newProduct) => {
    // const formData = new FormData()
    // formData.append("name", newProduct.name)
    // formData.append("description", newProduct.description)
    // formData.append("price", newProduct.price)
    // formData.append("image", newProduct.picture)
    // await axios.post(API_ROUTES.PRODUCTS, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    // const productRequest = {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: newProduct.name,
    //     description: newProduct.description,
    //     price: newProduct.price,
    //     picture: newProduct.pictureUrl,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }
    // const response = await fetch(API_URL, productRequest)
    // const data = await response.json()
    // const products = get().products
    // const newProducts = [...products, { ...newProduct, id: data.id }]
    // set({ products: newProducts })
  },

  editProduct: async (updateProduct) => {
    console.log(updateProduct)
    const productRequest = {
      method: "PUT",
      body: JSON.stringify({
        id: updateProduct.id,
        name: updateProduct.name,
        description: updateProduct.description,
        price: Number(updateProduct.price),
        picture: updateProduct.picture,
      }),
    }

    await fetch(`${API_ROUTES.PRODUCTS}/${updateProduct.id}`, productRequest)
    const products = get().products
    const indexProduct = products.findIndex((item) => item.id === updateProduct.id)
    const headerProducts = products.slice(0, indexProduct)
    const tailProducts = products.slice(indexProduct + 1)
    const newProducts = [...headerProducts, updateProduct, ...tailProducts]
    set({ products: newProducts })
  },

  deleteProduct: async (productId) => {
    const productRequest = {
      method: "DELETE",
      body: JSON.stringify({
        id: productId,
      }),
    }

    await fetch(`${API_ROUTES.PRODUCTS}/${productId}`, productRequest)
    const products = get().products
    const newProducts = products.filter((item) => item.id !== productId)
    set({ products: newProducts })
  },
}))

getProducts().then((products) => useProductsStore.setState({ products }))
