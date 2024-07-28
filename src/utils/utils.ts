import { IProduct } from "@/interfaces/product"

export const BASE_URL = "http://localhost:3001"

export const API_ROUTES = {
  PRODUCTS: `${BASE_URL}/api/products`,
}

export const APP_ROUTES = {
  HOME: BASE_URL,
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

export const createOrEdit = async ({ newProduct, modifyFunction, type }: { newProduct: IProduct; modifyFunction: Function; type: string }) => {
  const newErrors = []
  const res = await modifyFunction(newProduct)
  if (!res) newErrors.push(`Cannot ${type} product`)
  return newErrors
}

export const validateForm = (name: string, price: number) => {
  const newErrors: string[] = []

  if (!name) {
    newErrors.push("'Name' cannot be empty")
  } else if (checkWhitespace(name)) {
    newErrors.push("'Name' cannot contain only white space")
  } else if (name.length < 2 || name.length > 255) {
    newErrors.push("'Name' must be between 2 and 255 characters")
  } else if (StartWithWhiteSpace(name)) {
    newErrors.push("'Name' cannot start with white space")
  }

  if (!price) {
    newErrors.push("'Price' cannot be empty")
  } else if (checkAnyWhiteSpace(price.toString())) {
    newErrors.push("'Price' cannot contain a blank space")
  } else if (!isNumber(price)) {
    newErrors.push("'Price' is not a number")
  }

  return newErrors
}
