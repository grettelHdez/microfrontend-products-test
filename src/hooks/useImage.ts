import axios from "axios"
import { API_ROUTES } from "@/utils/utils"
import { useEffect, useState } from "react"

export const useImage = ({ imageId }) => {
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => {
    const getImage = async () => {
      try {
        console.log("eff", `${API_ROUTES.IMAGES}/${imageId}`)
        const res = await axios.get(`${API_ROUTES.IMAGES}/${imageId}`)
        const data = await res.data
        const { image } = data
        console.log("eff", image)
      } catch (error) {
        console.log(error)
      }
    }
    if (imageId) getImage()
  }, [imageId])

  return { imageFile }
}
