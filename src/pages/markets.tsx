import type { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { titleState } from '@/states/title';
import { useRecoilState } from 'recoil';
import { sessionProps } from '@/utils/session';

const MarketsPage: NextPage = () => {
  const { data: session, status } = useSession();

  const [_, setTitle] = useRecoilState(titleState);
  setTitle('News');

  useEffect(() => {
    if (status == 'unauthenticated') console.log(status); //Router.push('/signin');
    if (status == 'authenticated') console.log(session); //Router.push('/signin');
  });

  return (
    <MainLayout>
      <h1>Task</h1>
    </MainLayout>
  );
};

export default MarketsPage;

export const getServerSideProps: GetServerSideProps = sessionProps;
