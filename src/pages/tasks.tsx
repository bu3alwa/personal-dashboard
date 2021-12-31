import type { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { MainLayout } from '@/components/MainLayout';
import { titleState } from '@/states/title';
import { useRecoilState } from 'recoil';
import { sessionProps } from '@/utils/session';

const TasksPage: NextPage = () => {
  const { data: session } = useSession();

  if (!session) console.log('placeholder');

  const [_, setTitle] = useRecoilState(titleState);
  setTitle('Tasks');

  return (
    <MainLayout>
      <>
        <h1>Task</h1>
      </>
    </MainLayout>
  );
};

export default TasksPage;

export const getServerSideProps: GetServerSideProps = sessionProps;
