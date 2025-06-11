import React, { useRef, useState } from "react"
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null)
  const [previewURL, setPreviewURL] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      // Update the image state
      setImage(file)

      //   Generate preview URL from the file
      const preview = URL.createObjectURL(file)
      setPreviewURL(preview)
    }
    // e.preventDefault()
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewURL(null)
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <section className="flex justidy-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-[#875cf5]" />

          <button
            type="button"
            onClick={onChooseFile}
            className="h-8 w-8 flex items-center justify-center bg-[#875cf5] rounded-full absolute -bottom-1 -right-1"
          >
            <LuUpload className="text-[#fcfbfc] cursor-pointer" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewURL}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="h-8 w-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
          >
            <LuTrash className="cursor-pointer" />
          </button>
        </div>
      )}
    </section>
  )
}

export default ProfilePhotoSelector
