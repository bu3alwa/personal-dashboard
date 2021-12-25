import router from 'next/router';
import { useEffect } from 'react';
import useUser from '../../utils/hooks';

/**
 * Guard against unauthenitcated users for frontend
 * redirects to login
 */
export function AuthGuard({ children }: { children: JSX.Element }) {
  const [user, { isLoading }] = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.push('/login');
    }
  }, [user]);

  if (isLoading) return <h1>Loading</h1>;
  if (!isLoading && user) return <>{children}</>;
  return null;
}
