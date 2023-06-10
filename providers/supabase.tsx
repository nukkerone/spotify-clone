'use client'

import { useState } from 'react'
import { Database as DatabaseTypes } from '@/types/supabase'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

type SupabaseProps = {
  children: React.ReactNode
}

const SupabaseProvider: React.FC<SupabaseProps> = ({ children }) => {
  const [supabaseClient] = useState(() => {
    return createClientComponentClient<DatabaseTypes>();
  });

  return <SessionContextProvider supabaseClient={supabaseClient}>
    {children}
  </SessionContextProvider>
}

export default SupabaseProvider
