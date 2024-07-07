import Link from "next/link"
import { FC } from "react"
import { IProductCard } from "@/interfaces/product"
import { useProductsStore } from "@/store/store"
import { useRouter } from "next/router"
import { APP_ROUTES } from "@/utils/utils"
import { Popconfirm } from "antd"

export const ProductCard: FC<IProductCard> = ({ id, name, description, price, picture }) => {
  const router = useRouter()
  const deleteProduct = useProductsStore((state) => state.deleteProduct)

  const onDeleteProduct = (id: string | string[] | undefined) => {
    if (!id) return
    deleteProduct(id)
    router.push(APP_ROUTES.PRODUCTS)
  }

  return (
    <article className="w-full h-full flex flex-col items-center justify-center">
      <div className="max-w-450 min-h-623 w-full flex flex-col gap-10 mt-10 mb-10 items-center border border-gray-200 rounded-lg p-8">
        <div className="max-h-80 flex items-center object-cover">
          <img className="w-full h-full" src={picture} />
        </div>
        <div className="w-full flex flex-col gap-6">
          <h1 className="font-bold text-3xl">{name}</h1>
          <div className="flex flex-col">
            <p>{description}</p>
          </div>
          <span className="text-3xl font-bold">${price}</span>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <Link href={`${APP_ROUTES.PRODUCTS}/edit/${id}`} className="border border-gray-200 rounded-lg p-1 w-40 font-semibold transition-all duration-300 hover:bg-gray-200 text-center">
            Edit
          </Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteProduct(id)}>
            <a href="#" className="text-center bg-red-500 rounded-lg p-1 w-40 text-white font-semibold transition-all duration-300 hover:bg-red-400">
              Delete
            </a>
          </Popconfirm>
        </div>
      </div>
    </article>
  )
}
