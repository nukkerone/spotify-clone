import { useEffect } from "react"
import { Auth } from "@supabase/auth-ui-react"
import Modal from "./modal"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModal from "@/hooks/useAuthModal"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const AuthModal = () => {
  const { supabaseClient } = useSessionContext();
  const { isOpen, onClose } = useAuthModal();
  const { session } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.refresh();
      toast.success('You are now signed in')
    }
    onClose();
  }, [session, router, onClose]);

  return <Modal title="Sign In" description="Enter your credentials and sign in" isOpen={isOpen} onChange={onClose}>
    <Auth theme="dark" supabaseClient={supabaseClient} magicLink appearance={{
      theme: ThemeSupa,
      variables: {
        default: {
          colors: {
            brand: '#404040',
            brandAccent: '#22c55e'
          }
        }
      }
    }} />
  </Modal>
}

export default AuthModal
