import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import { Box, Button, CircularProgress, Collapse, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Face, Fingerprint } from '@mui/icons-material';
import { getCsrfToken } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { signIn } from 'next-auth/react';

/**
 * Login page frontend ui
 */
export default function SigninPage({ csrfToken }: SigninPageProps) {
  const [errorMsg] = useState('');
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    signIn('credentials', { username: target.username.value, password: target.password.value });
    setLoading(true);
  }

  return (
    <>
      <Box sx={{ height: '100vh' }} bgcolor="primary.main">
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
          <Paper sx={{ p: 4, m: 4 }} elevation={10}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item sx={{ mb: 3, p: 3 }}>
                <Typography variant="h3">Sign in</Typography>
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
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Grid container spacing={2} mb={2} alignItems="flex-end">
                <Grid item>
                  <Face />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField id="username" name="username" label="Username" type="text" fullWidth autoFocus required />
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item>
                  <Fingerprint />
                </Grid>
                <Grid item md={true} sm={true} xs={true}>
                  <TextField id="password" name="password" label="Password" type="password" fullWidth required />
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
                  Sign in
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};

interface SigninPageProps {
  csrfToken?: string | undefined;
}
