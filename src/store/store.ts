import axios from "axios"
import { create } from "zustand"
import { ProductState } from "@/interfaces/product"
import { API_ROUTES, getProducts } from "@/utils/utils"

export const useProductsStore = create<ProductState>((set, get) => ({
  products: [],

  updateProducts: (newProducts) => {
    set({ products: newProducts })
  },

  addProduct: async (newProduct) => {
    try {
      const res = await axios.post(API_ROUTES.PRODUCTS, newProduct)
      const data = await res.data
      const products = get().products
      const newProducts = [...products, { ...newProduct, id: data.id }]
      set({ products: newProducts })
    } catch (error) {
      console.log(error)
    }
  },

  editProduct: async (updateProduct) => {
    try {
      await axios.put(`${API_ROUTES.PRODUCTS}/${updateProduct.id}`, updateProduct)
      const products = get().products
      const indexProduct = products.findIndex((item) => item.id === updateProduct.id)
      const headerProducts = products.slice(0, indexProduct)
      const tailProducts = products.slice(indexProduct + 1)
      const newProducts = [...headerProducts, updateProduct, ...tailProducts]
      set({ products: newProducts })
    } catch (error) {
      console.log(error)
    }
  },

  deleteProduct: async (productId) => {
    try {
      await axios.delete(`${API_ROUTES.PRODUCTS}/${productId}`)
      const products = get().products
      const newProducts = products.filter((item) => item.id !== productId)
      set({ products: newProducts })
    } catch (error) {
      console.log(error)
    }
  },
}))

getProducts().then((products) => useProductsStore.setState({ products }))
