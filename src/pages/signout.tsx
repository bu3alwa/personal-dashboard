import { useEffect } from 'react';

export default function logoutPage() {
  useEffect(() => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <h1>Logged out</h1>
    </>
  );
}
