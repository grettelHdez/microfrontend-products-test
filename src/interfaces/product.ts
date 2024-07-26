import { Dispatch, SetStateAction } from "react"

export interface IProduct {
  id?: string
  name: string
  description?: string
  price: number
}

export interface IProductCard {
  id?: string | string[]
  name: string
  description?: string
  price: number
}

export interface ProductState {
  products: IProduct[]
  addProduct: (newProduct: IProduct) => void
  editProduct: (updateProduct: IProduct) => void
  deleteProduct: (productId: string) => void
}

export interface IProductForm {
  product?: IProduct | null
}

export interface IModifyProduct {
  title: string
  product?: IProduct | null
}

export interface IProductTable {
  products: IProduct[] | undefined
  setProducts: Dispatch<SetStateAction<IProduct[] | undefined>>
}
