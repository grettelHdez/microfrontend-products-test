import type { NextApiRequest, NextApiResponse } from "next"
import { createProduct, getProducts } from "@/database/queries"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res)

    case "POST":
      return createProduct(req, res)

    default:
      return res.status(400).json({
        message: "Bad request",
      })
  }
}
