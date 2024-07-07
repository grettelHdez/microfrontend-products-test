import { FC } from "react"
import Link from "next/link"
import Icon from "@ant-design/icons/lib/components/Icon"
import { Layout, Menu } from "antd"
import { ISidebar } from "@/interfaces/ui"

const { Sider } = Layout

export const Sidebar: FC<ISidebar> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu className="h-screen p-4" theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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
