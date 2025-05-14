'use server'
import { createClient } from "../supabase/server"

export async function getUser() {
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()

    console.log(data)

    if (error || !data?.user) {
        return null
    }

    return data.user
}