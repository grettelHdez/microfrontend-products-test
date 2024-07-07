import type { NextApiRequest, NextApiResponse } from "next"
import { deleteProduct, getProduct, updateProduct } from "@/database/queries"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getProduct(req, res)

    case "PUT": {
      return updateProduct(req, res)
    }

    case "DELETE": {
      return deleteProduct(req, res)
    }

    default:
      return res.status(400).json({
        message: "Bad request",
      })
  }
}
