import { FC, useState } from "react"
import { useProductsStore } from "@/store/store"
import { Button, Form, Input } from "antd"
import { useRouter } from "next/router"
import { APP_ROUTES } from "@/utils/utils"
import { IEditProduct, IProduct } from "@/interfaces/product"

type LayoutType = Parameters<typeof Form>[0]["layout"]

export const EditProductForm: FC<IEditProduct> = ({ idProduct, nameProduct, descriptionProduct, priceProduct, pictureProduct }) => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal")

  const [name, setName] = useState(nameProduct)
  const [description, setDescription] = useState(descriptionProduct)
  const [price, setPrice] = useState(priceProduct)
  const [picture, setPicture] = useState(pictureProduct)
  const editProduct = useProductsStore((state) => state.editProduct)

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }

  const formItemLayout = formLayout === "horizontal" ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null
  const buttonItemLayout = formLayout === "horizontal" ? { wrapperCol: { span: 14, offset: 4 } } : null

  const updateProduct = () => {
    if (name === "" || price === null) return

    const newProduct: IProduct = {
      id: String(idProduct),
      name: String(name),
      description: String(description),
      price: Number(price),
      picture: String(picture),
    }

    editProduct(newProduct)
    router.push(APP_ROUTES.PRODUCTS)
  }

  return (
    <Form
      className="w-full ms-12"
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
    >
      <Form.Item label="Name">
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Item>
      <Form.Item label="Description">
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Item>
      <Form.Item label="Price">
        <Input value={price} onChange={(e) => setPrice(e.target.value)} required />
      </Form.Item>
      <Form.Item label="Picture">
        <Input value={picture} onChange={(e) => setPicture(e.target.value)} />
      </Form.Item>
      <Form.Item {...buttonItemLayout} className="w-full">
        <Button type="primary" className="w-full mt-5" onClick={updateProduct}>
          Edit
        </Button>
      </Form.Item>
    </Form>
  )
}
