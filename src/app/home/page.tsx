'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import SelectStock from '@/components/selectStock'
import ShowWatchList from '@/components/showWatchList'
import { getWatchlist, signOut } from './actions'
import { fetchNews } from './actions'
import { requestPermission } from '@/utils/firebase/firebase'
import { getMessaging, onMessage } from "firebase/messaging";
import { getUser } from '@/utils/auth/getUser'
import { sendAllNotifications } from '@/utils/sendAllNotifications'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Dialog, DialogClose, DialogFooter, DialogDescription, DialogTitle, DialogHeader, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { SignOutDialog } from '@/components/sign-out-dialog'
import Link from 'next/link'


function page() {
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

  async function getNews() {
    try {
      const news = await fetchNews(watchlist[0]?.Symbol)
      console.log(news)
    } catch (error) {
      console.error("Error fetching news:", error)
    }
  }

  useEffect(() => {
    requestPermission();

    const fetchUser = async () => {
      const user = await getUser()
      setUser(user)
      console.log(user)
    }
    fetchUser()

    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      toast(payload?.data?.title, {
        description: payload?.data?.body,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    });

    const fetchWatchlist = async () => {
      const stocks = await getWatchlist()
      setWatchlist(stocks || [])
    }
    fetchWatchlist()
  }, [])

  return (
    <div className="min-h-screen w-full bg-shade-1
    py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-12">
      <div className="h-full w-full max-w-[1200px] flex flex-col gap-3 
        sm:gap-4 md:gap-5 my-10">
        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <Image src="/main-logo.png" 
            alt="logo" width={400} height={400}
            className="w-[400px] h-auto"
            style={{
              filter: 'brightness(0) invert(0.7)'
            }}/>

          <div className="flex items-center gap-4 
            sm:justify-between md:justify-end w-full">
            <div className="text-shade-5 text-lg font-bold">
              <div className='font-light'>Welcome </div>
              <div className='truncate max-w-[120px] sm:max-w-full inline-block align-bottom'>
                {user?.user_metadata?.display_name}
              </div>
            </div>
            <SignOutDialog />
          </div>
        </nav>
        <div className='w-full border-2 border-shade-5 mb-2 sm:mb-3'></div>
        <ShowWatchList stocks={watchlist} />
        <SelectStock />

        <Button 
          onClick={sendAllNotifications}
          className="w-full h-10 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg"
        >
          Send
        </Button>

        <Toaster />
      </div>
    </div>
  )
}

export default page
