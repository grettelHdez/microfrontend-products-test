import axios from "axios"
import { ChangeEvent, FC, useState } from "react"
import { useProductsStore } from "@/store/store"
import { Button, Form, Input } from "antd"
import { useRouter } from "next/router"
import { API_ROUTES, APP_ROUTES } from "@/utils/utils"
import { LayoutType } from "@/interfaces/ui"
import { IEditProduct } from "@/interfaces/product"
import { useImage } from "@/hooks/useImage"
import { InputImage } from "./InputImage"

export const EditProductForm: FC<IEditProduct> = ({ idProduct, nameProduct, descriptionProduct, priceProduct, pictureProduct }) => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal")
  const formItemLayout = formLayout === "horizontal" ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null
  const buttonItemLayout = formLayout === "horizontal" ? { wrapperCol: { span: 14, offset: 4 } } : null

  const [id] = useState(() => {
    return idProduct
  })

  const [name, setName] = useState(() => {
    return nameProduct
  })

  const [description, setDescription] = useState(() => {
    return descriptionProduct
  })

  const [price, setPrice] = useState(() => {
    return priceProduct
  })

  const imageId = pictureProduct?.toString().split(APP_ROUTES.IMAGES + "/")[1]
  const { imageUrl, imageFile, setImageFile } = useImage({ id: imageId })
  const [selectedImage, setSelectedImage] = useState("")
  const editProduct = useProductsStore((state) => state.editProduct)

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }

  const changeImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)
      console.log(file)
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  const updateProduct = async () => {
    if (name === "" || !imageFile) return

    try {
      const formData = new FormData()
      formData.append("image", imageFile)

      const res = await axios.post(API_ROUTES.IMAGES, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      const data = await res.data
      const { imageUrl } = data
      console.log("get image url from api/image:", imageUrl)

      const newProduct = {
        id,
        name,
        description,
        price: Number(price),
        picture: imageUrl,
      }

      editProduct(newProduct)
      router.push(APP_ROUTES.PRODUCTS)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form className="w-full ms-12" {...formItemLayout} layout={formLayout} form={form} initialValues={{ layout: formLayout }} onValuesChange={onFormLayoutChange} style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}>
      <Form.Item label="Name">
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Item>
      <Form.Item label="Description">
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Item>
      <Form.Item label="Price">
        <Input value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
      </Form.Item>
      <InputImage image={selectedImage} changeImageFile={changeImageFile} imageUrl={imageUrl} />
      <Form.Item {...buttonItemLayout} className="w-full">
        <Button type="primary" className="w-full mt-5" onClick={updateProduct}>
          Edit
        </Button>
      </Form.Item>
    </Form>
  )
}
