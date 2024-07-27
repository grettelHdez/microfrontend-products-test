import Link from "next/link"
import { FC } from "react"
import { Table, Popconfirm } from "antd"
import { Record } from "@/interfaces/product"
import { APP_ROUTES } from "@/utils/utils"
import { IProductTable } from "@/interfaces/product"
import { deleteProduct } from "@/services/products"

export const ProductsTable: FC<IProductTable> = ({ products, setProducts }) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "25%",
      render: (text: string) => renderColumns(text),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      render: (text: string) => renderColumns(text),
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "15%",
      render: (text: string) => renderColumns(text),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "40%",
      render: (text: string) => renderColumns(text),
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      width: "40%",
      render: (text: string) => renderColumns(text),
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      width: "40%",
      render: (text: string) => renderColumns(text),
    },
    {
      title: "",
      dataIndex: "",
      render: (record: Record) => {
        return products && products.length > 0 ? <Link href={`${APP_ROUTES.MODIFY_PRODUCT}/${record.id}`}>Edit</Link> : null
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (record: Record) => {
        return products && products.length > 0 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              if (record.id) onDelete(record.id)
            }}
          >
            <a href="#">Delete</a>
          </Popconfirm>
        ) : null
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (record: Record) => {
        return products && products.length > 0 ? <Link href={`${APP_ROUTES.PRODUCTS}/details/${record.id}`}>Details</Link> : null
      },
    },
  ]

  const onDelete = (id: string) => {
    deleteProduct(id)
    const newProducts = products?.filter((item) => item.id !== id)
    setProducts(newProducts)
  }

  const renderColumns = (text: string) => {
    return <span>{text}</span>
  }

  return <Table className="table-products" dataSource={products} columns={columns} bordered />
}
