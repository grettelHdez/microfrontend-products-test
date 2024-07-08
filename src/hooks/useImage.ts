import axios from "axios"
import { useEffect, useState } from "react"
import { API_ROUTES } from "@/utils/utils"

export const useImage = ({ id }: { id: string | string[] | undefined }) => {
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    const getImage = async () => {
      try {
        const res = await axios.get(`${API_ROUTES.IMAGES}/${id}`)
        const data = await res.data
        const { image } = data
        const buff = Buffer.from(image.data)
        const file = new Blob([buff])
        const url = URL.createObjectURL(file)
        setImageUrl(url)
      } catch (error) {
        console.log(error)
      }
    }
    if (id) getImage()
  }, [id])

  return { imageUrl }
}
