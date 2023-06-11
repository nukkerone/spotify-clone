'use client'

import AuthModal from '@/components/auth-modal'
import Modal from '@/components/modal'
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
  </>
}

export default ModalProvider
