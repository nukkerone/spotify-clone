'use client'

import { Subscription, UserDetails } from "@/types/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSessionContext, useUser as useSupabaseUser } from "@supabase/auth-helpers-react";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

type UserContextProviderProps = {
  [key: string]: any;
}

/**
 * Provides a simple api for accessing user data. Behind the scenes, it uses the supabase auth session and db client
 * to fetch the user's details and subscription, etc.
 * 
 * @param props 
 */
export const UserContextProvider = (props: UserContextProviderProps) => {
  const supabaseUser = useSupabaseUser()
  const [user, setUser] = useState<User | null>(supabaseUser)
  const { session, isLoading: isLoadingUser, supabaseClient } = useSessionContext();
  const accessToken = session?.access_token || null
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  const getUserDetails = () => supabaseClient.from('users').select('*').single()
  // const getSubscription = () => supabaseClient.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single()
  const getSubscription = () => Promise.resolve()

  // I use this hook to avoid supabase user object from changing and triggering a re-render due to Object.is comparison.
  useEffect(() => {
    setUser(supabaseUser)
  }, [JSON.stringify(supabaseUser)]);

  useEffect(() => {
    // We sync up the user details and subscription with the user session.
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true)
      Promise.all([getUserDetails(), getSubscription()]).then(([userDetailsPromise, subscriptionPromise]) => {
        if (userDetailsPromise.statusText === 'fulfilled') {
          setUserDetails(userDetailsPromise.data as UserDetails);
        }
        /* if (subscriptionPromise.statusText === 'fulfilled') {
          setSubscription(subscriptionPromise.data as Subscription);
        } */
        setIsLoadingData(false)
      })
    } else if (!user && !isLoadingData && !isLoadingUser) {
      setUserDetails(null)
      setSubscription(null)
    }
  }, [user, isLoadingUser]);

  return <UserContext.Provider value={{
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  }} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider')
  }
  return context
}
