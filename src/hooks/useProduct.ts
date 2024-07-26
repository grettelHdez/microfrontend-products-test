import axios from "axios"
import { useEffect, useState } from "react"
import { API_ROUTES } from "@/utils/utils"
import { IProduct } from "@/interfaces/product"

export const useProduct = ({ id }: { id?: string | string[] }) => {
  const [product, setProduct] = useState<IProduct>()

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`${API_ROUTES.PRODUCTS}/${id}`)
      const { product } = await res.data
      setProduct(product)
    }
    if (id) getProduct()
  }, [id])

  return { product }
}
