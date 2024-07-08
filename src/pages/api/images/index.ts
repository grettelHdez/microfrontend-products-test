import path from "path"
import fs from "fs/promises"
import formidable from "formidable"
import { v4 as uuidv4 } from "uuid"
import { NextApiRequest, NextApiResponse } from "next"
import { API_ROUTES, APP_ROUTES } from "@/utils/utils"
import { ProcessedFiles } from "@/interfaces/image"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function uploadImage(req: NextApiRequest, res: NextApiResponse) {
  console.log("creaProduct-construct api post promise")

  try {
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
      console.log("inside promise")

      const form = formidable()
      const files: ProcessedFiles = []

      form.on("file", function (field, file) {
        files.push([field, file])
      })

      form.on("end", () => resolve(files))
      form.on("error", (err) => reject(err))
      form.parse(req, () => {})
    })
    console.log(files)
    console.log("before files lenght after form.parse")

    if (files?.length) {
      console.log("files lenght")
      const targetPath = path.join(process.cwd(), `/src/uploads/`) //Create directory for uploads

      try {
        await fs.access(targetPath)
      } catch (e) {
        await fs.mkdir(targetPath)
      }

      const file = files[0]

      if (file) {
        const tempPath = file[1].filepath
        const imageId = uuidv4() + file[1].originalFilename
        const imageUrl = `${APP_ROUTES.IMAGES}/${imageId}`
        await fs.rename(tempPath, targetPath + imageId)
        console.log("url: ", imageUrl)
        console.log("Files were uploaded successfully")
        return res.status(200).json({ message: "Files were uploaded successfully", imageUrl })
      }
    }
    return res.status(500).json({ message: "Upload image error", imageUrl: null })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Upload image error", imageUrl: null })
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return uploadImage(req, res)

    default:
      return res.status(400).json({
        message: "Bad request",
      })
  }
}
