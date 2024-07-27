import Link from "next/link"
import { FC, useState } from "react"
import { useRouter } from "next/router"
import { Popconfirm } from "antd"
import { IProductCard } from "@/interfaces/product"
import { APP_ROUTES } from "@/utils/utils"
import { deleteProduct } from "@/services/products"
import { PrintErrors } from "./PrintErrors"

export const ProductCard: FC<IProductCard> = ({ id, name, description, price }) => {
  const router = useRouter()
  const [errors, setErrors] = useState<string[]>([])

  const onDeleteProduct = async (id: string | string[] | undefined) => {
    if (!id) return
    const res = await deleteProduct(id.toString())
    if (!res) setErrors(["Cannot delete this product"])
    else router.push(APP_ROUTES.PRODUCTS)
  }

  return (
    <article className="w-full h-full flex flex-col items-center justify-center">
      <div className="max-w-450 min-h-623 w-full flex flex-col gap-10 mt-10 mb-10 items-center border border-gray-200 rounded-lg p-8">
        <div className="w-full flex flex-col gap-6">
          <h1 className="font-bold text-3xl">{name}</h1>
          <div className="flex flex-col">
            <p>{description}</p>
          </div>
          <span className="text-3xl font-bold">${price}</span>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <Link href={`${APP_ROUTES.MODIFY_PRODUCT}/${id}`} className="border border-gray-200 rounded-lg p-1 w-40 font-semibold transition-all duration-300 hover:bg-gray-200 text-center">
            Edit
          </Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteProduct(id)}>
            <a href="#" className="text-center bg-red-500 rounded-lg p-1 w-40 text-white font-semibold transition-all duration-300 hover:bg-red-400">
              Delete
            </a>
          </Popconfirm>
        </div>
        <PrintErrors errors={errors} />
      </div>
    </article>
  )
}
