'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getUser } from '@/utils/auth/getUser'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import SelectStock from '@/components/selectStock'
import { User } from '@supabase/supabase-js'
import ShowWatchList from '@/components/showWatchList'
import { getWatchlist } from './actions'

function page() {
  const [watchlist, setWatchlist] = useState<any[]>([])

  useEffect(() => {
    const fetchWatchlist = async () => {
      const stocks = await getWatchlist()
      setWatchlist(stocks || [])
    }
    fetchWatchlist()
  }, [])

  return (
    <div className="h-screen w-full bg-shade-1
    py-8 px-12 flex items-center justify-center">
      <div className="h-full w-full max-w-[1400px] flex flex-col">
        <nav className="flex justify-between items-center">
          <Image src="/main-logo.png" 
            alt="logo" width={400} height={400}
            style={{
              filter: 'brightness(0) invert(0.7)'
            }}/>

          <div className="flex gap-4">
            <Link href="/login">
              <Button className="w-32 h-10 font-medium bg-shade-4">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-32 h-10 font-medium">
                Sign in
              </Button>
            </Link>
          </div>
        </nav>
        <div className='w-full border-2 border-shade-5 mt-5'></div>

        <SelectStock />

        <ShowWatchList stocks={watchlist} />
      </div>
    </div>
  )
}

export default page
