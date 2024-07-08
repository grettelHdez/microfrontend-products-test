import fs from "fs/promises"
import { NextApiRequest, NextApiResponse } from "next"
import path from "path"

export async function getImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    const imagePath = path.join(process.cwd(), "src", "/uploads", id)
    console.log(imagePath)

    try {
      const image = await fs.readFile(imagePath, (err, image) => {
        if (err) {
          throw err
        }
        console.log(image)
        return image
      })
      console.log(image)
      return res.status(200).json({ message: "Image founded", image })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: "Image not found", image: null })
    }
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
