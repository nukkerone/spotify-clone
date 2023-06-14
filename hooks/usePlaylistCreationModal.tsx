
import { create } from 'zustand'

type PlaylistCreationModal = {
  isOpen: boolean,
  songId?: string,
  onOpen: (songId?: string) => void,
  onClose: () => void
}

const usePlaylistCreationModal = create<PlaylistCreationModal>((set) => ({
  isOpen: false,
  songId: undefined,
  onOpen: (songId) => set({ isOpen: true, songId }),
  onClose: () => set({ isOpen: false, songId: undefined })
}))

export default usePlaylistCreationModal
