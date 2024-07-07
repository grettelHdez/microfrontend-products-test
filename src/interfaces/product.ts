export interface IProduct {
  id?: string
  name: string
  description: string
  price: number
  picture: string
  editable?: boolean
  [column: string]: string | boolean | number | undefined
}

export interface ProductState {
  products: IProduct[]
  updateProducts: (newProducts: IProduct[]) => void
  addProduct: (newProduct: IProduct) => void
  editProduct: (updateProduct: IProduct) => void
  deleteProduct: (productId: string | string[] | undefined) => void
}

export interface IProductCard {
  id: string | string[] | undefined
  name: string
  description: string
  price: number
  picture: string
  editable?: boolean
}


export interface IEditProduct {
  idProduct: string | string[] | undefined
  nameProduct: string | string[] | undefined
  descriptionProduct: string | string[] | undefined
  priceProduct: string | string[] | undefined
  pictureProduct: string | string[] | undefined
}
