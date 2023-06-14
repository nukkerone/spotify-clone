'use client'

import AuthModal from '@/components/auth-modal'
import PlaylistCreationModal from "@/components/playlist-creation-modal"
import UploadModal from "@/components/upload-modal"
import { useState, useEffect } from 'react'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return <>
    <AuthModal />
    <UploadModal />
    <PlaylistCreationModal />
  </>
}

export default ModalProvider
