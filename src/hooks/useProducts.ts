import { useEffect, useState } from "react"
import { getProducts } from "@/services/products"
import { IProduct } from "@/interfaces/product"

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>()

  useEffect(() => {
    const getProductsFromDB = async () => {
      const res = await getProducts()
      const data = await res?.data
      setProducts(data)
    }
    getProductsFromDB()
  }, [])

  return { products, setProducts }
}
