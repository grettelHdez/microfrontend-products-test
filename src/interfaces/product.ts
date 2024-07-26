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
  updateProducts: (newProducts: IProduct[]) => void
  addProduct: (newProduct: IProduct) => void
  editProduct: (updateProduct: IProduct) => void
  deleteProduct: (productId: string) => void
}

export interface IProductForm {
  product?: IProduct
}
