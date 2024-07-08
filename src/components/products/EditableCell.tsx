import { FC } from "react"
import { Input } from "antd"
import { IEditableCell } from "@/interfaces/table"
import { useImage } from "@/hooks/useImage"
import { APP_ROUTES } from "@/utils/utils"
import Link from "next/link"

export const EditableCell: FC<IEditableCell> = ({ editable, value, onChange, column }) => {
  const id = value.toString().split(APP_ROUTES.IMAGES + "/")[1]
  const { imageUrl } = useImage({ id })
  return (
    <div>
      {editable ? (
        <Input style={{ margin: "-5px 0" }} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : column === "picture" ? (
        <Link href={value}>
          {" "}
          <img src={imageUrl} />{" "}
        </Link>
      ) : (
        value
      )}
    </div>
  )
}
