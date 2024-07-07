import { Dispatch, ReactNode, SetStateAction } from "react"

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