"use client";


import LoginForm from '../../components/LoginForm';
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
