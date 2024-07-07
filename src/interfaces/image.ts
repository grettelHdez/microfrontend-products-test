import { ChangeEvent,  } from "react"

export interface PropsInputImage {
  image: string
  changeImageFile: (e: ChangeEvent<HTMLInputElement>) => void
}
