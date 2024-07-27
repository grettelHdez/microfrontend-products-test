import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { Layout, Menu } from "antd"
import { ISidebar } from "@/interfaces/ui"
import Icon from "@ant-design/icons/lib/components/Icon"

const { Sider } = Layout

export const Sidebar: FC<ISidebar> = ({ collapsed }) => {
  const router = useRouter()
  const [selectedKey, setSelectedKey] = useState("1")

  useEffect(() => {
    if (router.pathname === "/products") setSelectedKey("2")
    else setSelectedKey("1")
  }, [router.pathname])

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu className="h-screen p-4" theme="dark" mode="inline" selectedKeys={[selectedKey]}>
        <Menu.Item key="1">
          <Icon type="user" />
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <Link href="/products">Products</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}
