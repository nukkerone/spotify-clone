'use client'

import { twMerge } from "tailwind-merge"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { useRouter } from "next/navigation"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import Button from "./button"
import ListItem from "./list-item"

type HeaderProps = {
  className?: string,
  children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ className, children }) => {

  const router = useRouter()

  return <header
    className={twMerge(`
      h-fit
      bg-gradient-to-b
      from-emerald-900
      p-6
    `, className)}
  >

    <div className="flex gap-x-2 mb-4">
      <button className="hidden md:flex items-center justify-center p-2 bg-black rounded-full hover:opacity-75 transition" onClick={() => router.back()}>
        <RxCaretLeft size="25" className="text-white" />
      </button>

      <button className="hidden md:flex items-center justify-center p-2 bg-black rounded-full hover:opacity-75 transition" onClick={() => router.forward()}>
        <RxCaretRight size="25" className="text-white" />
      </button>
    </div>

    <div className="flex md:hidden gap-x-2 mb-4">
      <button className="flex items-center justify-center p-2 bg-white rounded-full hover:opacity-75 transition" onClick={() => router.back()}>
        <HiHome size="20" className="text-black" />
      </button>

      <button className="flex items-center justify-center p-2 bg-white rounded-full hover:opacity-75 transition" onClick={() => router.forward()}>
        <BiSearch size="20" className="text-black" />
      </button>

      <div className="flex justify-between items-center gap-x-4 ml-auto">
        <Button className="flex-nowrap bg-transparent text-neutral-300">Sign up</Button>
        <Button className="bg-white px-6 py-2">Log in</Button>
      </div>
    </div>

    <div className="flex mb-4 flex-col">
      { children && <h1 className="text-white text-3xl font-semibold">{ children }</h1> }

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
        <ListItem image="/images/liked.png" name="Liked songs" href="/"></ListItem>
      </div>

      <div className="flex flex-col">
        <h2 className="text-white text-xl font-semibold mt-8">Newest songs</h2>
        <div>
          List of songs!
        </div>
      </div>
    </div>

  </header>
}

export default Header