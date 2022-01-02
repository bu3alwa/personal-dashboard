import type { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { MainLayout } from '@/components/MainLayout';
import { titleState } from '@/states/title';
import { useRecoilState } from 'recoil';
import { sessionProps } from '@/utils/session';
import List from '@mui/material/List';
import TaskItem from '@/components/TaskItemComponent';
import AddTaskComponent from '@/components/AddTaskComponent';
import { trpc } from '@/utils/trpc';
import { useEffect } from 'react';

/**
 * Task page that shows all tasks
 * handles query to get all tasks
 */
export default function TasksPage() {
  const [_, setTitle] = useRecoilState(titleState);
  const { data: tasks, refetch } = trpc.useQuery(['task.all']);

  setTitle('Tasks');

  useEffect(() => {
    refetch();
  });

  if (!tasks) return; // Typescript complaining

  return (
    <MainLayout>
      <>
        <List sx={{ width: '100%', bgcolor: 'primary.light' }}>
          <AddTaskComponent />
          {tasks.map(item => {
            return <TaskItem key={item.id} task={item.task} id={item.id} />;
          })}
        </List>
      </>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = sessionProps;
