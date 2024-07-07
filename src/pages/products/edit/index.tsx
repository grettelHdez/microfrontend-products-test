import { EditProductForm } from "@/components/products/EditProduct"
import { useRouter } from "next/router"

export default function EditProduct() {
  const route = useRouter()
  const { id, name, description, price, picture } = route.query

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="w-520 h-500 flex flex-col items-center p-4 gap-10 mt-10 border border-gray-200 rounded-lg">
        <h1 className="text-4xl mt-10 font-bold">Edit Product</h1>
        <EditProductForm idProduct={id} nameProduct={name} descriptionProduct={description} priceProduct={price} pictureProduct={picture} />
      </div>
    </section>
  )
}
