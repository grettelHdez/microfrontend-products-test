import { FC } from "react"
import { Errors } from "@/interfaces/product"

export const PrintErrors: FC<Errors> = ({ errors }) => {
  return (
    <div className="flex gap-2 text-red-600 text-md">
      {errors.length > 0 && <span>! Errors:</span>}
      <div className="flex flex-col">
        {errors.map((error) => (
          <span key={error}>{error}</span>
        ))}
      </div>
    </div>
  )
}
