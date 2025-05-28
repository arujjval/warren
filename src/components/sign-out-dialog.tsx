'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { signOut } from '@/app/home/actions'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function SignOutDialog() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
      setIsLoading(false)
      router.push('/login')
    } catch (error) {
      console.error('Sign out failed:', error)
      toast.error('Failed to sign out. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-shade-5 text-shade-1 hover:bg-shade-5/80'>
          Sign out
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSignOut}
            className='bg-shade-5 text-shade-1 hover:bg-shade-5/80'
            disabled={isLoading}
          >
            {isLoading ? 'Signing out...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 