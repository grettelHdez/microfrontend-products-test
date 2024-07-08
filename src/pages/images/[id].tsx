import { useRouter } from "next/router"
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
