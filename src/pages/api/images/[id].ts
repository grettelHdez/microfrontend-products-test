import path from "path"
import fs from "fs/promises"
import { NextApiRequest, NextApiResponse } from "next"

export async function getImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    if (id) {
      const imagePath = path.join(process.cwd(), "src", "/uploads", id.toString())

      try {
        const image = await fs.readFile(imagePath, (err, image) => {
          if (err) {
            throw err
          }
          return image
        })
        return res.status(200).json({ message: "Image founded", image })
      } catch (error) {
        console.log("Image not found", error)
        return res.status(400).json({ message: "Image not found", image: null })
      }
    }
    return res.status(400).json({ message: "Image not found", image: null })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Image not found", image: null })
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getImage(req, res)
    default:
      return res.status(400).json({
        message: "Bad request Image",
      })
  }
}
