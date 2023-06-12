'use client'

import { twMerge } from "tailwind-merge"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { useRouter } from "next/navigation"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import Button from "./button"
import ListItem from "./list-item"
import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { FaUserAlt } from "react-icons/fa"
import toast from "react-hot-toast"

type HeaderProps = {
  className?: string,
  children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ className, children }) => {

  const router = useRouter()
  const { onOpen: onAuthModalOpen } = useAuthModal();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();

  const onLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) { 
      toast.error(error.message);
    } else {
      toast.success('Logged out successfully');
      router.refresh();
    }
  }

  return <header
    className={twMerge(`
      h-fit
      bg-gradient-to-b
      from-emerald-900
      p-6
    `, className)}
  >

    <div className="flex">
      <div className="flex gap-x-2 mb-4">
        <button className="hidden md:flex aspect-square items-center justify-center p-2 bg-black rounded-full hover:opacity-75 transition" onClick={() => router.back()}>
          <RxCaretLeft size="25" className="text-white" />
        </button>

        <button className="hidden md:flex aspect-square items-center justify-center p-2 bg-black rounded-full hover:opacity-75 transition" onClick={() => router.forward()}>
          <RxCaretRight size="25" className="text-white" />
        </button>
      </div>

      <div className="flex gap-x-2 mb-4 flex-1">
        <button className="flex md:hidden aspect-square items-center justify-center p-2 bg-white rounded-full hover:opacity-75 transition" onClick={() => router.back()}>
          <HiHome size="25" className="text-black" />
        </button>

        <button className="flex md:hidden aspect-square items-center justify-center p-2 bg-white rounded-full hover:opacity-75 transition" onClick={() => router.forward()}>
          <BiSearch size="25" className="text-black" />
        </button>

        <div className="flex justify-between items-center gap-x-4 ml-auto">
          {
            user && <>
              <Button className="bg-white px-6 py-2 whitespace-nowrap" onClick={onLogout}>Log out</Button>
              <Button className="bg-white" onClick={() => router.push('/account')}>
                <FaUserAlt size="20" className="text-black" />
              </Button>
            </>
          }
          {
            !user && <>
              <Button className="flex-nowrap bg-transparent text-neutral-300 whitespace-nowrap" onClick={onAuthModalOpen}>Sign up</Button>
              <Button className="bg-white px-6 py-2" onClick={onAuthModalOpen}>Log in</Button>
            </>
          }
        </div>
      </div>
    </div>

    <div className="flex mb-4 flex-col">
      {children && <h1 className="text-white text-3xl font-semibold">{children}</h1>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
        <ListItem image="/images/liked.png" name="Liked songs" href="/"></ListItem>
      </div>
    </div>

  </header>
}

export default Header