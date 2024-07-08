import { PropsInputImage } from "@/interfaces/image"
import { FC } from "react"

export const InputImage: FC<PropsInputImage> = ({ image, imageUrl = null, changeImageFile }) => {
  return (
    <label className="ms-4 me-16 flex flex-col items-center">
      <input className="bg-blue-100" hidden type="file" onChange={changeImageFile} />
      <div className={`mt-2 w-40 aspect-video rounded flex items-center justify-center cursor-pointer ${image ? "border-none" : "border-2 border-dashed"}`}>{image ? <img src={image} alt={image} /> : imageUrl ? <img src={imageUrl} /> : <span>Select Image</span>}</div>
    </label>
  )
}
