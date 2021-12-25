import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import useUser from '../src/utils/hooks';
import axios, { AxiosError } from 'axios';
import Alert from '@mui/material/Alert';
import { Box, Button, CircularProgress, Collapse, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Face, Fingerprint } from '@mui/icons-material';

/**
 * Login page frontend ui
 */
export default function LoginPage() {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const params = new URLSearchParams();
    params.append('username', target.username.value);
    params.append('password', target.password.value);

    try {
      let res = await axios.post('/api/auth/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'access-control-allow-origin': '*',
        },
      });

      if (res.status == 201) {
        localStorage.setItem('token', res.data.token);
        mutate(res.data.username);
      }
    } catch (error: any | AxiosError) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        if (err.response?.status == 401) {
          setErrorMsg('Incorrect username or password.');
          setOpen(true);
          setLoading(false);
        } else {
          setErrorMsg('Something went wrong.');
          setOpen(true);
          setLoading(false);
        }
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (user) {
      Router.push('/');
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      <Box sx={{ height: '100vh' }} bgcolor="primary.main">
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
          <Paper sx={{ p: 4, m: 4 }} elevation={10}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item sx={{ mb: 3, p: 3 }}>
                <Typography variant="h3">Login</Typography>
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
                  Login
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Box>
    </>
  );
}
