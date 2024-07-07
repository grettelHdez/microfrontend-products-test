import { ProductCard } from "@/components/products/ProductCard"
import { useProduct } from "@/hooks/useProduct"
import { useRouter } from "next/router"

export default function Product() {
  const router = useRouter()
  const { id } = router.query
  const { product } = useProduct({ productId: id })

  return <ProductCard id={id} name={product.name} description={product.description} price={product.price} picture={product.picture} />
}
