
import type { NextApiRequest, NextApiResponse } from "next"
import { createProduct, getProducts } from "@/database/queries"

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export async function uploadImage(req: NextApiRequest, res: NextApiResponse) {
//   console.log("creaProduct-construct api post promise")

//   try {
//     const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
//       console.log("inside promise")

//       const form = formidable()
//       const files: ProcessedFiles = []

//       form.on("file", function (field, file) {
//         files.push([field, file])
//       })

//       form.on("end", () => resolve(files))
//       form.on("error", (err) => reject(err))
//       form.parse(req, () => {})
//     })
//     console.log(files)
//     console.log("before files lenght after form.parse")

//     if (files?.length) {
//       console.log("files lenght")
//       const targetPath = path.join(process.cwd(), `/src/uploads/`) //Create directory for uploads

//       try {
//         await fs.access(targetPath)
//       } catch (e) {
//         await fs.mkdir(targetPath)
//       }

//       const file = files[0]

//       if (file) {
//         const tempPath = file[1].filepath
//         const imageId = uuidv4() + file[1].originalFilename
//         const imageUrl = `${BASE_URL}/api/images/${imageId}`
//         console.log("url: ", imageUrl)
//         await fs.rename(tempPath, targetPath + imageId)
//       }
//     }
//     console.log("Files were uploaded successfully")
//   } catch (error) {}
// }

// export async function readProductData(req: NextApiRequest, res: NextApiResponse) {
//   uploadImage(req, res)
//   const data = req.body
//   console.log(data)
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res)

    case "POST":
      return createProduct(req, res)

    default:
      return res.status(400).json({
        message: "Bad request Products",
      })
  }
}
