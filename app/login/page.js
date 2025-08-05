"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../components/LoginForm';  // Make sure this is also client component if it uses hooks
import { isAuthenticated } from '../../utils/auth';

export default function Login() {
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated()) {
      router.push('/tasks');
    }
  }, [router]);

  return <LoginForm />;
}
