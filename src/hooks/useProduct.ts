import { useEffect, useState } from "react"
import { IProduct } from "@/interfaces/product"
import { useProductsStore } from "@/store/store"

const initialProductState = {
  name: "",
  description: "",
  price: 0,
  picture: "",
}

export const useProduct = ({ productId }: { productId: string | string[] | undefined }) => {
  const [product, setProduct] = useState<IProduct>(initialProductState)
  const products = useProductsStore((state) => state.products)

  useEffect(() => {
    const getProduct = products.find((item) => item.id === productId)
    if (getProduct) setProduct(getProduct)
  }, [productId])

  return { product }
}
