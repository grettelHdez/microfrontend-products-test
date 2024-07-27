import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Button, Form, Input } from "antd"
import { LayoutType } from "@/interfaces/ui"
import { IProduct, IProductForm } from "@/interfaces/product"
import { addProduct, editProduct } from "@/services/products"
import { APP_ROUTES, checkAnyWhiteSpace, checkWhitespace, isNumber, StartWithWhiteSpace } from "@/utils/utils"

export const ProductForm: FC<IProductForm> = ({ product }) => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [errors, setErrors] = useState<string[]>([])
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal")
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

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }

  const createOrEdit = async ({ newProduct, modifyFunction, type }: { newProduct: IProduct; modifyFunction: Function; type: string }) => {
    const res = await modifyFunction(newProduct)
    if (!res) {
      const newErrors = [`Cannot ${type} product`]
      setErrors(newErrors)
      return
    }
    router.push(APP_ROUTES.PRODUCTS)
  }

  const validateForm = (name: string, price: number) => {
    const newErrors: string[] = []

    if (!name) {
      newErrors.push("'Name' cannot be empty")
    } else if (checkWhitespace(name)) {
      newErrors.push("'Name' cannot contain only white space")
    } else if (name.length < 2 || name.length > 255) {
      newErrors.push("'Name' must be between 2 and 255 characters")
    } else if (StartWithWhiteSpace(name)) {
      newErrors.push("'Name' cannot start with blank space")
    }

    if (!price) {
      newErrors.push("'Price' cannot be empty")
    } else if (checkAnyWhiteSpace(price.toString())) {
      newErrors.push("'Price' cannot contain a blank space")
    } else if (!isNumber(price)) {
      newErrors.push("'Price' is not a number")
    }

    setErrors(newErrors)
    return newErrors.length <= 0
  }

  const modifyProduct = async () => {
    const { Name, Description, Price } = form.getFieldsValue()

    if (validateForm(Name, Price)) {
      const newProduct = {
        name: Name,
        description: Description ? Description : "",
        price: Number(Price),
      }

      if (product?.id) {
        const newProductId = { ...newProduct, id: product.id }
        createOrEdit({ newProduct: newProductId, modifyFunction: editProduct, type: "edit" })
      } else {
        createOrEdit({ newProduct, modifyFunction: addProduct, type: "create" })
      }
    }
  }

  return (
    <Form className="w-full flex flex-col gap-4" {...formItemLayout} layout={formLayout} form={form} initialValues={{ layout: formLayout }} onValuesChange={onFormLayoutChange}>
      <Form.Item
        label="Name"
        name="Name"
        rules={[
          {
            min: 2,
            max: 255,
            required: true,
          },
          {
            pattern: new RegExp(/^[a-zA-Z0-9]+[a-zA-Z0-9\s]*$/),
            message: "'Name' cannot start with blank space",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="Description">
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="Price"
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
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" className="w-full mt-5" onClick={modifyProduct}>
          {product?.id ? "Edit" : "Create"}
        </Button>
      </Form.Item>
      <div className="flex gap-2 text-red-600 text-md">
        {errors.length > 0 && <span>! Errors:</span>}
        <div className="flex flex-col">
          {errors.map((error) => (
            <span key={error}>{error}</span>
          ))}
        </div>
      </div>
    </Form>
  )
}
