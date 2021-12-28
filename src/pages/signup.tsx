import { trpc } from '@/utils/trpc';
import { Face, Fingerprint } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Collapse,
  Alert,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import Router from 'next/router';
import React, { useState } from 'react';

export default function SignupPage() {
  const [errorMsg, setErrorMsg] = useState('');
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const mutation = trpc.useMutation(['user.create'], {
    onSuccess: async () => {
      Router.push('/signin');
    },
    onError: async () => {
      setErrorMsg('Something went wrong');
      setOpen(true);
    },
  });
  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    mutation.mutate({
      username: target.username.value,
      password: target.password.value,
    });

    setLoading(false);
  }

  return (
    <>
      <Box sx={{ height: '100vh' }} bgcolor="primary.main">
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
          <Paper sx={{ p: 4, m: 4 }} elevation={10}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item sx={{ mb: 3, p: 3 }}>
                <Typography variant="h3">Signup</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              {loading && (
                <Grid item sx={{ m: 1 }}>
                  <CircularProgress color="inherit" />
                </Grid>
              )}
            </Grid>
            <Grid container spacing={0} alignItems="flex-end">
              {errorMsg && (
                <Grid item sx={{ m: 2 }}>
                  <Collapse in={open}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                      severity="error"
                    >
                      {' '}
                      {errorMsg}
                    </Alert>
                  </Collapse>
                </Grid>
              )}
            </Grid>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2} mb={2} alignItems="flex-end">
                <Grid item>
                  <Face />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField id="username" label="Username" fullWidth autoFocus required />
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <Fingerprint />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField id="password" label="Password" type="password" fullWidth required />
                </Grid>
              </Grid>
              <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                <Button
                  type="submit"
                  sx={{ m: 2 }}
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: 'none' }}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Box>
    </>
  );
}
