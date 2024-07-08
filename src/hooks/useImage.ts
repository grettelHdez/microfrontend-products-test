import axios from "axios"
import { API_ROUTES } from "@/utils/utils"
import { useEffect, useState } from "react"

export const useImage = ({ id }) => {
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    const getImage = async () => {
      try {
        console.log("eff", `${API_ROUTES.IMAGES}/${id}`)
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
