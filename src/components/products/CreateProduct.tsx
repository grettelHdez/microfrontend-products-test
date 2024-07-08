import { ChangeEvent, useState } from "react"
import { useProductsStore } from "@/store/store"
import { Button, Form, Input } from "antd"
import { useRouter } from "next/router"
import { API_ROUTES, APP_ROUTES } from "@/utils/utils"
import { LayoutType } from "@/interfaces/ui"
import { InputImage } from "./InputImage"
import axios from "axios"

export const CreateProductForm = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal")
  const formItemLayout = formLayout === "horizontal" ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null
  const buttonItemLayout = formLayout === "horizontal" ? { wrapperCol: { span: 14, offset: 4 } } : null

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const addProduct = useProductsStore((state) => state.addProduct)

  const [imageFile, setImageFile] = useState<File>()
  const [selectedImage, setSelectedImage] = useState("")

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

  const createProduct = async () => {
    if (name === "" || price === "") return

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
        name,
        description,
        price: Number(price),
        picture: imageUrl,
      }

      addProduct(newProduct)
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
        <Input value={price} onChange={(e) => setPrice(e.target.value)} required />
      </Form.Item>
      <InputImage image={selectedImage} changeImageFile={changeImageFile} />
      <Form.Item {...buttonItemLayout} className="w-full">
        <Button type="primary" className="w-full mt-5" onClick={createProduct}>
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}
