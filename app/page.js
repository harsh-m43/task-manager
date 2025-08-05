"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { isAuthenticated } from '../utils/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/tasks');
    } else {
      router.push('/login');
    }
  }, [router]);

  return <div>Redirecting...</div>;
}
