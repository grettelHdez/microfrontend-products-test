import { ChangeEvent, useState } from "react"
import { useProductsStore } from "@/store/store"
import { Button, Form, Input } from "antd"
import { useRouter } from "next/router"
import { APP_ROUTES } from "@/utils/utils"
import { LayoutType } from "@/interfaces/ui"
import { InputImage } from "./InputImage"

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
  const [imageUrl, setImageUrl] = useState("")

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }

  const changeImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)
      setImageUrl(URL.createObjectURL(file))
    }
  }

  const createProduct = () => {
    if (name === "" || price === "") return

    const newProduct = {
      name,
      description,
      price: Number(price),
      picture: imageFile,
    }

    addProduct(newProduct)
    router.push(APP_ROUTES.PRODUCTS)
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
      <InputImage image={imageUrl} changeImageFile={changeImageFile} />
      <Form.Item {...buttonItemLayout} className="w-full">
        <Button type="primary" className="w-full mt-5" onClick={createProduct}>
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}
