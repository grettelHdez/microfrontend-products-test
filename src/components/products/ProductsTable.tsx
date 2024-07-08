import Link from "next/link"
import { useState } from "react"
import { Table, Popconfirm } from "antd"
import { EditableCell } from "./EditableCell"
import { useProductsStore } from "@/store/store"
import { Record } from "@/interfaces/table"
import { IProduct } from "@/interfaces/product"
import { APP_ROUTES } from "@/utils/utils"

export const ProductsTable = () => {
  const products = useProductsStore((state) => state.products)
  const editProduct = useProductsStore((state) => state.editProduct)
  const deleteProduct = useProductsStore((state) => state.deleteProduct)
  const updateProducts = useProductsStore((state) => state.updateProducts)

  const [cacheData, setCacheData] = useState(() => {
    if (products) return products.map((item) => ({ ...item }))
  })

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "25%",
      render: (text: string, record: Record) => renderColumns(text, record, "id"),
    },
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      render: (text: string, record: Record) => renderColumns(text, record, "name"),
    },
    {
      title: "description",
      dataIndex: "description",
      width: "15%",
      render: (text: string, record: Record) => renderColumns(text, record, "description"),
    },
    {
      title: "price",
      dataIndex: "price",
      width: "40%",
      render: (text: string, record: Record) => renderColumns(text, record, "price"),
    },
    {
      title: "picture",
      dataIndex: "picture",
      width: "40%",
      render: (text: string, record: Record) => renderColumns(text, record, "picture"),
    },
    {
      title: "",
      dataIndex: "",
      render: (text: string, record: Record) => {
        return products.length >= 1 ? <Link href={`${APP_ROUTES.PRODUCTS}/edit/${record.id}`}>Edit</Link> : null
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (text: string, record: Record) => {
        return products.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.id)}>
            <a href="#">Delete</a>
          </Popconfirm>
        ) : null
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (text: string, record: Record) => {
        return products.length >= 1 ? <Link href={`${APP_ROUTES.PRODUCTS}/details/${record.id}`}>Details</Link> : null
      },
    },
  ]

  const handleChange = (value: string, id: string, column: string) => {
    const newData = [...products]
    const target = newData.filter((item) => id === item.id)[0]

    if (target) {
      target[column] = value
      updateProducts(newData)
    }
  }

  const onEdit = (id: string) => {
    const newData = [...products]
    const target = newData.filter((item) => id === item.id)[0]
    if (target) {
      target.editable = true
      updateProducts(newData)
    }
  }

  const onDelete = (id: string) => {
    deleteProduct(id)
    updateProducts(products.filter((item) => item.id !== id))
  }

  const onSave = (id: string) => {
    const newData = [...products]
    const target = newData.filter((item) => id === item.id)[0]
    if (target) {
      delete target.editable
      editProduct(target)
      updateProducts(newData)
      setCacheData(newData.map((item) => ({ ...item })))
    }
  }

  const onCancel = (id: string) => {
    const newData = [...products]
    const target: IProduct = newData.filter((item) => id === item.id)[0]
    if (target && cacheData) {
      Object.assign(target, cacheData.filter((item) => id === item.id)[0])
      delete target.editable
      updateProducts(newData)
    }
  }

  const renderColumns = (text: string, record: Record, column: string) => {
    return <EditableCell id={record.id} editable={record.editable} value={text} column={column} onChange={(value: string) => handleChange(value, record.id, column)} />
  }

  return <Table className="table-products" bordered dataSource={products} columns={columns} />
}
