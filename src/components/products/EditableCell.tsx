import { FC } from "react"
import { Input } from "antd"
import { IEditableCell } from "@/interfaces/table"

export const EditableCell: FC<IEditableCell> = ({ editable, value, onChange, column }) => (
  <div>{editable ? <Input style={{ margin: "-5px 0" }} value={value} onChange={(e) => onChange(e.target.value)} /> : column === "picture"? <img src={value}/> : value}</div>
)
