import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Button, Form, Input } from "antd"
import { LayoutType } from "@/interfaces/ui"
import { IProductForm } from "@/interfaces/product"
import { addProduct, editProduct } from "@/services/products"
import { APP_ROUTES, createOrEdit, validateForm } from "@/utils/utils"
import { PrintErrors } from "./PrintErrors"

export const ProductForm: FC<IProductForm> = ({ product }) => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [errors, setErrors] = useState<string[]>([])
  const [formLayout] = useState<LayoutType>("horizontal")
  const formItemLayout = formLayout === "horizontal" ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null
  const buttonItemLayout = formLayout === "horizontal" ? { wrapperCol: { span: 14, offset: 4 } } : null

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        Name: product.name,
        Description: product.description,
        Price: product.price,
      })
    }
  }, [product])

  const modifyProduct = async () => {
    const { Name, Description, Price } = form.getFieldsValue()
    let errorsList = validateForm(Name, Price)

    if (errorsList.length <= 0) {
      const newProduct = {
        name: Name,
        description: Description ? Description : "",
        price: Number(Price),
      }

      errorsList = product?.id ? await createOrEdit({ newProduct: { ...newProduct, id: product.id }, modifyFunction: editProduct, type: "edit" }) : await createOrEdit({ newProduct, modifyFunction: addProduct, type: "create" })
      if (errorsList.length <= 0) return router.push(APP_ROUTES.PRODUCTS)
    }
    setErrors(errorsList)
  }

  return (
    <Form className="w-full flex flex-col gap-2 p-1 items-center" {...formItemLayout} layout={formLayout} form={form} initialValues={{ layout: formLayout }}>
      <Form.Item
        className="w-full ms-12"
        name="Name"
        label="Name"
        rules={[
          {
            min: 2,
            max: 255,
            required: true,
          },
          {
            pattern: new RegExp(/^[a-zA-Z0-9]+[a-zA-Z0-9\s]*$/),
            message: "'Name' cannot start with white space",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item className="w-full ms-12" name="Description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item
        className="w-full ms-12"
        name="Price"
        label="Price"
        rules={[
          {
            required: true,
          },
          {
            pattern: new RegExp(/^[0-9]*$/),
            message: "'Price' must be a number",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item className="w-full ms-12" {...buttonItemLayout}>
        <Button type="primary" className="w-full mt-5" onClick={modifyProduct}>
          {product?.id ? "Edit" : "Create"}
        </Button>
      </Form.Item>
      <PrintErrors errors={errors} />
    </Form>
  )
}
