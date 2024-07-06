'use client'

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { FormSignIn } from '@/components/auth/sign-in'
import { useSessionData } from '@/hooks/use-session-data';

const SigninPage: React.FC = () => {
  const { status } = useSessionData();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  return (
    <FormSignIn />
  );
};

export default SigninPage;
