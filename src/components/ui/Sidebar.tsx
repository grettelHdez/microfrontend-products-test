import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { Layout, Menu } from "antd"
import { ISidebar } from "@/interfaces/ui"
import { APP_ROUTES, BASE_URL, SIDEBAR_KEYS } from "@/utils/utils"
import Icon from "@ant-design/icons/lib/components/Icon"

const { Sider } = Layout

export const Sidebar: FC<ISidebar> = ({ collapsed }) => {
  const router = useRouter()

  const [selectedKey, setSelectedKey] = useState(() => {
    const newRoute = `${BASE_URL}${router.pathname}`
    return newRoute.includes(APP_ROUTES.PRODUCTS) ? SIDEBAR_KEYS.KEY_2 : SIDEBAR_KEYS.KEY_1
  })

  useEffect(() => {
    const newRoute = `${BASE_URL}${router.pathname}`
    if (newRoute.includes(APP_ROUTES.PRODUCTS)) setSelectedKey(SIDEBAR_KEYS.KEY_2)
    else setSelectedKey(SIDEBAR_KEYS.KEY_1)
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
