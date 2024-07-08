import { EditProductForm } from "@/components/products/EditProduct"
import { useImage } from "@/hooks/useImage"
import { useProduct } from "@/hooks/useProduct"
import { APP_ROUTES } from "@/utils/utils"
import { useRouter } from "next/router"

export default function EditProduct() {
  const route = useRouter()
  const { id } = route.query
  const { product } = useProduct({ id })

  return (
    <>
      {product && (
        <section className="w-full h-full flex justify-center items-center">
          <div className="w-520 min-h-500 flex flex-col items-center p-4 gap-10 mt-10 border border-gray-200 rounded-lg">
            <h1 className="text-4xl mt-10 font-bold">Edit Product</h1>
            <EditProductForm idProduct={id?.toString()} nameProduct={product.name} descriptionProduct={product.description} priceProduct={product.price} pictureProduct={product.picture} />
          </div>
        </section>
      )}
    </>
  )
}
