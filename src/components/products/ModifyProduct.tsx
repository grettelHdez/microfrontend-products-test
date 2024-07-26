import { FC } from "react"
import { ProductForm } from "./ProductForm"
import { IModifyProduct } from "@/interfaces/product"

export const ModifyProduct: FC<IModifyProduct> = ({ title, product = null }) => {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="w-520 min-h-500 flex flex-col items-center p-4 gap-10 mt-10 border border-gray-200 rounded-lg">
        <h1 className="text-4xl mt-10 font-bold">{title}</h1>
        <ProductForm product={product} />
      </div>
    </section>
  )
}
