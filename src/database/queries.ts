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
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (product) return res.status(200).json(product)
    return res.status(400).json({ message: "Product not found" })
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}

export async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("new createproduct", req.body)
    const { name, description, price, picture } = req.body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        picture,
      },
    })

    if (product) {
      return res.status(200).json({ done: "ok" })
    }
    return res.status(400).json({ message: "Product not found" })
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}

// export async function createProduct(req: NextApiRequest, res: NextApiResponse) {

// }
//   const form = formidable()
//   let fields
//   let files

//   try {
//     console.log('craproduccc')
//     ;[fields, files] = await form.parse(req)
//     console.log("files", files)

//     const imageFile = files.file[0]
//     console.log("imageFile", imageFile)

//     if (!imageFile || !imageFile.filepath) {
//       return res.status(400).json({ message: "Not image file upload" })
//     }

//     const uploadDir = path.join(process.cwd(), "public", "uploads")
//     await fs.mkdir(uploadDir, { recursive: true })

//     const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9)
//     const newFileName = `${uniqueSuffix}-${imageFile.originalFilename}`
//     const newFilePath = `${uploadDir}/${newFileName}`

//     await fs.rename(imageFile.filepath, newFilePath)
//     console.log('Upload image', newFilePath)
//     res.status(200).json({message: 'Image uploaded successsfully', imageUrl: `/uploads/${newFileName}`})
//   } catch (error) {
//     console.log(error)
//   }
// }

// const readFile = (req: NextApiRequest, saveLocally?: boolean) => {
//   const options: formidable.Options = {}

//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), "public/images")
//     options.filename = (name, ext, path, form) => {
//       return Date.now().toString() + "_" + path.originalFilename + "." + ext
//     }
//   }

//   const form = formidable(options)
//   console.log('returning a promise')

//   return new Promise((resolve, reject) => {
//     console.log('inside promise')
//     form.parse(req, (err, fields, files) => {
//       console.log('inside promise ')
//       if (err) reject(err)
//       console.log("fields-files", { fields, files })
//       resolve({ fields, files })
//     })
//   })
// }

// export async function createProduct(req: NextApiRequest, res: NextApiResponse) {
//   console.log("createproduct api")
//   try {
//     await fs.readdir(path.join(process.cwd() + "/public", "/images"))
//   } catch (error) {
//     await fs.mkdir(path.join(process.cwd() + "/public", "/images"))
//   }

//   console.log("go to create file")
//   try {
//     const { fields, files } = await readFile(req, true)
//     console.log("wainting for path")
//     const targetPath = path.join(process.cwd() + "/public", "/images")

//     for (const file of files) {
//       const tempPath = file[1].filepath
//       await fs.rename(tempPath, targetPath + file[1].originalFilename)
//     }
//     res.json({ done: "OK" })
//   } catch (error) {
//     console.log("reject promise" + error)
//   }
// }

// export async function createProduct(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     console.log("createProduct in api")
//     let status = 200
//     let resultBody = { status: "ok", message: "Files were uploaded successfully" }

//     console.log("creaProduct-construct promise")
//     const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
//       console.log('inside promise')
//       const form = formidable()

//       const files: ProcessedFiles = []

//       console.log('form.on file')
//       form.on("file", function (field, file) {
//         files.push([field, file])
//       })

//       console.log("form.on end")
//       form.on("end", () => resolve(files))

//       console.log("form.on error")
//       form.on("error", (err) => reject(err))

//       console.log("form.on parse")
//       form.parse(req, () => {
//         //
//       })
//     }).catch((e) => {
//       console.log(e)
//       status = 500
//       resultBody = {
//         status: "fail",
//         message: "Upload error",
//       }
//     })

//     console.log("before files lenght")
//     if (files?.length) {
//       console.log('files lenght')
//       /* Create directory for uploads */
//       const targetPath = path.join(process.cwd(), `/src/uploads/`)
//       try {
//         await fs.access(targetPath)
//       } catch (e) {
//         await fs.mkdir(targetPath)
//       }

//       /* Move uploaded files to directory */
//       for (const file of files) {
//         const tempPath = file[1].filepath
//         await fs.rename(tempPath, targetPath + file[1].originalFilename)
//       }
//     }

//     console.log(resultBody)
//     res.status(status).json(resultBody)
//   } catch (error) {
//     return res.status(400).json("Bad Request")
//   }
// }

// export async function createProduct(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { name, description, price, picture } = req.body

//     const product = await prisma.product.create({
//       data: {
//         name,
//         description,
//         price,
//         picture,
//       },
//     })

//     if (product) {
//       return res.status(200).json(product)
//     }
//     return res.status(400).json({ message: "Product not found" })
//   } catch (error) {
//     return res.status(400).json("Bad Request")
//   }
// }

export async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    const { name, description, price, picture } = JSON.parse(req.body)

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        picture,
      },
    })

    if (product) return res.status(200).json(product)
    return res.status(400).json({ message: "Product not found" })
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}

export async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    const product = await prisma.product.delete({
      where: { id },
    })

    if (product) return res.status(200).json(product)
    return res.status(400).json({ message: "Product not found" })
  } catch (error) {
    return res.status(400).json("Bad Request")
  }
}
