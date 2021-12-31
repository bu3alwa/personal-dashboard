import type { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { titleState } from '@/states/title';
import { useRecoilState } from 'recoil';
import { sessionProps } from '@/utils/session';

const NewsPage: NextPage = () => {
  const { data: session, status } = useSession();

  const [_, setTitle] = useRecoilState(titleState);
  setTitle('News');

  useEffect(() => {
    if (status == 'unauthenticated') console.log(status); //Router.push('/signin');
    if (status == 'authenticated') console.log(session); //Router.push('/signin');
  });

  return (
    <MainLayout>
      <h1>News</h1>
    </MainLayout>
  );
};

export default NewsPage;

export const getServerSideProps: GetServerSideProps = sessionProps;
