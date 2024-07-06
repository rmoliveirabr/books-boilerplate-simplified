'use client'

import React from 'react';

import { useSessionData } from '@/hooks/use-session-data';

import { SignOutButton } from '@/components/auth/sign-out-button';
import { SignInButton } from '@/components/auth/sign-in-button';

export default function SignInOutLink() {
  const { status } = useSessionData();

  return (
    <div>
      {status == 'authenticated' ? 
        (<SignOutButton />) :
        (<SignInButton />)
      }
    </div>
  );
}