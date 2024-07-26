import { useRouter } from "next/router"
import { useProduct } from "@/hooks/useProduct"
import { ModifyProduct } from "@/components/products/ModifyProduct"

export default function CreateProduct() {
  const route = useRouter()
  const { id } = route.query
  const { product } = useProduct({ id })

  return <ModifyProduct title="Edit Product" product={product} />
}
