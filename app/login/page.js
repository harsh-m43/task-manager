"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../components/LoginForm';
import { isAuthenticated } from '../../utils/auth';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/tasks');
    }
  }, [router]);

  return <LoginForm />;
}
