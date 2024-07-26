import axios from "axios"

export const BASE_URL = "http://localhost:3001"

export const API_ROUTES = {
  PRODUCTS: `${BASE_URL}/api/products`,
}

export const APP_ROUTES = {
  PRODUCTS: `${BASE_URL}/products`,
  MODIFY_PRODUCT: `${BASE_URL}/products/modify`,
}

export const getProducts = async () => {
  try {
    const res = await axios.get(API_ROUTES.PRODUCTS)
    const data = await res.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export const isNumber = (number: number) => {
  return !isNaN(number)
}