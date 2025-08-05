import { logout } from '../utils/auth';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="layout">
      <header>
        <h1>Task Manager</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      <main>{children}</main>
    </div>
  );
}
