import { FC } from "react"
import { Layout } from "antd"
import { INavbar } from "@/interfaces/ui"
import Icon from "@ant-design/icons/lib/components/Icon"

const { Header } = Layout

export const Navbar: FC<INavbar> = ({ collapsed, setCollapsed }) => {
  const handleToggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <Icon className="trigger" type={collapsed ? "menu-unfold" : "menu-fold"} onClick={handleToggle} />
    </Header>
  )
}
