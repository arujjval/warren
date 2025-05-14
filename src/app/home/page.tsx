import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { getUser } from '@/utils/auth/getUser'
import { redirect } from 'next/navigation'

async function page() {
  const user = await getUser()

  console.log(user)

  return (
    <div>
      <h1>{user?.email}</h1>
    </div>
  )
}

export default page
