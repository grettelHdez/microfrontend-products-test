import { useRouter } from "next/router"
import { useProduct } from "@/hooks/useProduct"
import { ProductCard } from "@/components/products/ProductCard"

export default function Product() {
  const router = useRouter()
  const { id } = router.query
  const { product } = useProduct({ id })
  return <>{product && <ProductCard id={id} name={product.name} description={product.description} price={product.price} picture={product.picture} />}</>
}
