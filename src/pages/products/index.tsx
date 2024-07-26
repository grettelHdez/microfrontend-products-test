import Link from "next/link"
import { Suspense } from "react"
import { useProducts } from "@/hooks/useProducts"
import { ProductsTable } from "../../components/products/ProductsTable"
import { PlusIcon } from "../../components/ui/icons/PlusIcon"
import { APP_ROUTES } from "@/utils/utils"

export default function ProductPage() {
  const { products, setProducts } = useProducts()

  return (
    <section className="flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <h1 className="font-bold text-2xl">Products</h1>
        <Link href={`${APP_ROUTES.MODIFY_PRODUCT}`} className="flex gap-2 justify-between items-center border border-gray-200 rounded-md p-2 hover:bg-gray-200 hover:text-white  transition-all duration-300">
          <PlusIcon size="size-4" />
        </Link>
      </div>
      <Suspense>
        <ProductsTable products={products} setProducts={setProducts} />
      </Suspense>
    </section>
  )
}
