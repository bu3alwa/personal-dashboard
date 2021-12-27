import { signOut } from 'next-auth/react';

export default function logoutPage() {
  signOut();

  return (
    <>
      <h1>Logged out</h1>
    </>
  );
}
