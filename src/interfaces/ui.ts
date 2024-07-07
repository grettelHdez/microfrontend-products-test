import { Dispatch, ReactNode, SetStateAction } from "react"
import { Form } from "antd"

export type LayoutType = Parameters<typeof Form>[0]["layout"]

export interface Props {
  children: ReactNode
}

export interface INavbar {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

export interface ISidebar {
  collapsed: boolean
}
