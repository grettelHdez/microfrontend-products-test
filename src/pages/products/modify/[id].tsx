import { ProductForm } from "@/components/products/ProductForm"
import { useProduct } from "@/hooks/useProduct"
import { useRouter } from "next/router"

export default function CreateProduct() {
  const route = useRouter()
  const { id } = route.query
  const { product } = useProduct({ id })

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="w-520 min-h-500 flex flex-col items-center p-4 gap-10 mt-10 border border-gray-200 rounded-lg">
        <h1 className="text-4xl mt-10 font-bold">Edit Product</h1>
        <ProductForm product={product} />
      </div>
    </section>
  )
}
