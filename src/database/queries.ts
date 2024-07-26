import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/prisma"

export async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await prisma.product.findMany()
    if (products) {
      return res.status(200).json(products)
    } else return res.status(400).json({ message: "Cannot find any product" })
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}

export async function getProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    if (id) {
      const product = await prisma.product.findUnique({ where: { id: id.toString() } })
      if (product) return res.status(200).json({ product })
    }
    return res.status(400).json({ message: "Product not found" })
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}

export async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, description, price } = req.body
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    })

    if (product) {
      return res.status(200).json(product)
    }
    return res.status(400).json({ message: "Product not found" })
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}

export async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name, description, price } = req.body
    if (id) {
      const product = await prisma.product.update({
        where: { id: id.toString() },
        data: {
          name,
          description,
          price,
        },
      })
      if (product) return res.status(200).json(product)
    }
    return res.status(400).json({ message: "Product not found" })
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}

export async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    if (id) {
      const product = await prisma.product.delete({
        where: { id: id.toString() },
      })

      if (product) return res.status(200).json(product)
    }
    return res.status(400).json({ message: "Product not found" })
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}
