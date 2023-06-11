
import { create } from 'zustand'

type UploadModalState = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

const useUploadModal = create<UploadModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useUploadModal
