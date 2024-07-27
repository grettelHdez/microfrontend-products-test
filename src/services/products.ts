import axios from "axios"
import { IProduct } from "@/interfaces/product"
import { API_ROUTES } from "@/utils/utils"

export const getProducts = async () => {
  try {
    const res = await axios.get(API_ROUTES.PRODUCTS)
    const data = await res.data
    return { data }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const addProduct = async (newProduct: IProduct) => {
  try {
    const res = await axios.post(API_ROUTES.PRODUCTS, newProduct)
    const data = await res.data
    return { product: data }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const editProduct = async (updateProduct: IProduct) => {
  try {
    const res = await axios.put(`${API_ROUTES.PRODUCTS}/${updateProduct.id}`, updateProduct)
    const data = await res.data
    return { product: data }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`${API_ROUTES.PRODUCTS}/${id}`)
    const data = await res.data
    return { product: data }
  } catch (error) {
    console.log(error)
    return null
  }
}
