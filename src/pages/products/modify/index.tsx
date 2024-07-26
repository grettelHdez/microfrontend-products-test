import { ProductForm } from "@/components/products/ProductForm"

export default function CreateProduct() {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="w-520 min-h-500 flex flex-col items-center p-4 gap-10 mt-10 border border-gray-200 rounded-lg">
        <h1 className="text-4xl mt-10 font-bold">Create Product</h1>
        <ProductForm />
      </div>
    </section>
  )
}
