import Link from "next/link"
import { IconType } from "react-icons/lib"
import { twMerge } from "tailwind-merge"

type SidebarItemProps = {
  icon: IconType,
  label: string,
  href: string,
  active: boolean,
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, active }) => {
  return <Link 
    href={href}
    className={twMerge(`
      text-neutral-400
      hover:text-white
      flex
      flex-row
      items-center
      h-auto
      gap-x-2
      text-md
      font-medium
      cursor-pointer
      transition
      py-1
    `, active && 'text-white')}
  >
    <Icon size="24" />
    <p className="truncate w-full">{ label }</p>
  </Link>
}

export default SidebarItem
