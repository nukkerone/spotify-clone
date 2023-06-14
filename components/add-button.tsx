'use client'

import usePlaylistCreationModal from "@/hooks/usePlaylistCreationModal"
import useAuthModal from "@/hooks/useAuthModal"
import Button from "./button"
import { FaPlus } from "react-icons/fa"
import { useUser } from "@/hooks/useUser"

type AddButtonProps = {
  songId: string
}

const AddButton: React.FC<AddButtonProps> = ({ songId }) => {
  const playlistCreationModal = usePlaylistCreationModal()
  const authModal = useAuthModal()
  const { user } = useUser()

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    playlistCreationModal.onOpen(songId)
  }

  return <Button className="bg-transparent text-white" onClick={onClick}><FaPlus size={22} /></Button>
}

export default AddButton
