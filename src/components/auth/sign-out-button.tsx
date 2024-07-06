'use client'

import Button from '@mui/material/Button';
import { signOut } from 'next-auth/react'

import { useSessionData } from '@/hooks/use-session-data';

export function SignOutButton() {
  const handleSignOut = async () => { 
    await signOut({
      callbackUrl: '/',
    });
  }

  const { username } = useSessionData();

  return (
    <div>
      <div style={{ alignItems: 'right', fontSize: 12}}>Hello {username}!</div>
      <form action={handleSignOut}>
        {/* TODO: improve styling location */}
        <Button type="submit" sx={{
          backgroundColor: 'none',
          color: 'white'
        }}>
          Sign Out
        </Button>
      </form>
    </div>
  )
}
