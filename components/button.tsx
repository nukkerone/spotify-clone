import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  className?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, disabled, type = "button", ...props }, ref) => {
  return <button
    className={twMerge(`
      w-full
      rounded-full
      bg-green-500
      border
      border-transparent
      p-3
      whitespace-nowrap
      disabled:cursor-not-allowed
      disabled:opacity-50
      text-black
      font-bold
      hover:opacity-75
      transition
    `, className)}
    type={type}
    disabled={disabled}
    ref={ref}
    {...props}
  >
    { children }
  </button>
})

export default Button
