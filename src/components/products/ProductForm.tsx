import { FC, useEffect, useState } from "react"
import { useProductsStore } from "@/store/store"
import { Button, Form, Input } from "antd"
import { useRouter } from "next/router"
import { LayoutType } from "@/interfaces/ui"
import { IProductForm } from "@/interfaces/product"
import { APP_ROUTES, isNumber } from "@/utils/utils"

export const ProductForm: FC<IProductForm> = ({ product }) => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal")
  const formItemLayout = formLayout === "horizontal" ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null
  const buttonItemLayout = formLayout === "horizontal" ? { wrapperCol: { span: 14, offset: 4 } } : null
  const addProduct = useProductsStore((state) => state.addProduct)
  const editProduct = useProductsStore((state) => state.editProduct)

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        price: product.price,
      })
    }
  }, [product])

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }

  const modifyProduct = () => {
    const { name, description, price } = form.getFieldsValue()

    if (name !== "" && price !== "") {
      if (isNumber(price)) {
        const newProduct = {
          name,
          description,
          price:  Number(price),
        }

        if (product?.id) {
          const newProductId = { ...newProduct, id: product.id }
          editProduct(newProductId)
        } else {
          addProduct(newProduct)
        }
        router.push(APP_ROUTES.PRODUCTS)
      }
    }
  }

  return (
    <Form className="w-full" {...formItemLayout} layout={formLayout} form={form} initialValues={{ layout: formLayout }} onValuesChange={onFormLayoutChange}>
      <Form.Item label="Name" name="name">
        <Input required />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <Input required />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" className="w-full mt-5" onClick={modifyProduct}>
          {product?.id ? "Edit" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  )
}
