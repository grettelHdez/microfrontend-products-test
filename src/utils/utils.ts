export const BASE_URL = "http://localhost:3001"
export const API_URL = `${BASE_URL}/api/products`

export const APP_ROUTES = {
  PRODUCTS: `${BASE_URL}/products`
}

export const getProducts = async () => {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const ImageUrl = () => {
  
}