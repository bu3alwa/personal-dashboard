import type { NextPage } from 'next';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'unauthenticated') console.log(status); //Router.push('/signin');
    if (status == 'authenticated') console.log(session); //Router.push('/signin');
  });

  return (
    <MainLayout>
      <h1>Dashboard</h1>
    </MainLayout>
  );
};

export default Home;
