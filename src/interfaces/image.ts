import { ChangeEvent,  } from "react"
import { File } from "formidable"

export interface PropsInputImage {
  image: string
  changeImageFile: (e: ChangeEvent<HTMLInputElement>) => void
}

export type ProcessedFiles = Array<[string, File]>
