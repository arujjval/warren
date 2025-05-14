'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signup(formData: any) {
  const supabase = await createClient()

  const { email, password, username } = formData

  const data = {
    email: email as string,
    password: password as string,
    options: {
        data: {
            display_name: username as string
        }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}