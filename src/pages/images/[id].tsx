import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { API_ROUTES } from "@/utils/utils"
import { useImage } from "@/hooks/useImage"

export default function Image() {
  const router = useRouter()
  const { id } = router.query
  const { imageUrl } = useImage({ id })
 
  return (
    <>
      {imageUrl && (
        <div className="w-full h-full p-4">
          <img className="w-full h-full object-cover" src={imageUrl} />
        </div>
      )}
    </>
  )
}
