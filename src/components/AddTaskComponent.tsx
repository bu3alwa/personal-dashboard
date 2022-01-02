import { errorMsgState } from '@/states/errorMsg';
import { trpc } from '@/utils/trpc';
import { ListItem, Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

/**
 * Component for adding task on task page
 * handles create task
 */
const AddTaskComponent: React.FC = () => {
  const [task, setTask] = useState('');
  const [_, setErrorMsg] = useRecoilState(errorMsgState);

  const mutation = trpc.useMutation(['task.create'], {
    onSuccess: async () => {
      setTask('');
    },
    onError: async () => {
      setErrorMsg('Something went wrong');
    },
  });

  async function onClick() {
    if (task !== '') {
      mutation.mutate({
        task: task,
      });
    }
  }
  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  return (
    <>
      <ListItem
        disableGutters
        secondaryAction={
          <Box sx={{ px: 2 }}>
            <Button onClick={onClick}>Submit</Button>
          </Box>
        }
      >
        <TextField sx={{ px: 2 }} onChange={onChange} label="Add Task" value={`${task}`} />
      </ListItem>
    </>
  );
};

export default AddTaskComponent;
