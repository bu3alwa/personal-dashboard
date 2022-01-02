import { ListItem, IconButton, ListItemText, Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { trpc } from '@/utils/trpc';

type Props = {
  id: string;
  task: string;
};

/**
 * Component for each task on task page.
 * Handles update and delete task
 */
const TaskItem: React.FC<Props> = ({ task, id }: Props) => {
  const [edit, setEdit] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [taskState, setTaskState] = useState(task);

  const mutationDelete = trpc.useMutation(['task.delete'], {
    onSuccess: async () => {
      setTaskState('');
    },
    onError: async () => {
      setErrorMsg('Something went wrong');
    },
  });

  const mutationUpdate = trpc.useMutation(['task.update'], {
    onSuccess: async data => {
      setTaskState(data.task);
    },
    onError: async () => {
      setErrorMsg('Something went wrong');
    },
  });

  async function editButton() {
    setEdit(true);
  }

  async function deleteButton() {
    mutationDelete.mutate({ id: id });
  }
  async function submitButton() {
    mutationUpdate.mutate({ taskId: id, task: taskState });
    setEdit(false);
  }
  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskState(e.target.value);
  }

  return (
    <>
      {!edit && (
        <ListItem
          key={id}
          disableGutters
          secondaryAction={
            <Box sx={{ px: 2 }}>
              <IconButton onClick={editButton}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={deleteButton}>
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        >
          <ListItemText sx={{ px: 2 }} primary={`${task}`} />
        </ListItem>
      )}
      {edit && (
        <ListItem
          key={id}
          disableGutters
          secondaryAction={
            <Box sx={{ px: 2 }}>
              <IconButton onClick={submitButton}>
                <CheckIcon />
              </IconButton>
            </Box>
          }
        >
          <TextField sx={{ px: 2 }} onChange={onChange} defaultValue={`${task}`} />
        </ListItem>
      )}
    </>
  );
};

export default TaskItem;
