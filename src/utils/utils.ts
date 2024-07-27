export const BASE_URL = "http://localhost:3001"

export const API_ROUTES = {
  PRODUCTS: `${BASE_URL}/api/products`,
}

export const APP_ROUTES = {
  PRODUCTS: `${BASE_URL}/products`,
  MODIFY_PRODUCT: `${BASE_URL}/products/modify`,
}

export const SIDEBAR_KEYS = {
  KEY_1: "1",
  KEY_2: "2",
}

export const isNumber = (number: number) => {
  return !isNaN(number)
}

export const checkWhitespace = (str: string | undefined) => {
  return !str?.replace(/\s/g, "").length
}

export const checkAnyWhiteSpace = (str: string) => {
  return /\s/.test(str)
}

export const StartWithWhiteSpace = (str: string | undefined) => {
  return str?.replace(/^[a-zA-Z0-9]+[a-zA-Z0-9\s]*$/, "").length
}
