import type { NextPage } from 'next';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { titleState } from '@/states/title';
import { useRecoilState } from 'recoil';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [_, setTitle] = useRecoilState(titleState);

  setTitle('Dashboard');

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
