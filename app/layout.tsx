import Sidebar from "@/components/sidebar"
import './globals.css'
import { Figtree } from 'next/font/google'
import SupabaseProvider from "@/providers/supabase"
import { UserContextProvider } from "@/hooks/useUser"
import ModalProvider from "@/providers/modal"

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserContextProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
