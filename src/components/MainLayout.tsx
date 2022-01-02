import theme from '@/theme';
import {
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  Container,
  Grid,
  Alert,
  Collapse,
} from '@mui/material';
import { ThemeProvider } from '@mui/private-theming';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import NavItems from './NavItems';
import AppBarComponent from './AppBarComponent';
import DrawerComponent from './DrawerComponent';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRecoilState } from 'recoil';
import { titleState } from '@/states/title';
import { errorMsgState } from '@/states/errorMsg';
import { useSession } from 'next-auth/react';
import CloseIcon from '@mui/icons-material/Close';

// prop definition
type Props = {
  children: JSX.Element;
};

/**
 * Main Layout for the app
 */
export const MainLayout: React.FC<Props> = ({ children }: Props) => {
  const [title] = useRecoilState(titleState);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [openErrorMsg, setOpenErrorMsg] = useState(false);
  const session = useSession();
  const [errorMsg, setErrorMsg] = useRecoilState(errorMsgState);
  const user = session.data?.user?.name;

  const toggleDrawer = () => {
    setOpenDrawer(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarComponent color="primary" position="absolute" open={openDrawer}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(openDrawer && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Typography>{user}</Typography>
          </Toolbar>
        </AppBarComponent>
        <DrawerComponent variant="permanent" open={openDrawer}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <NavItems />
          </List>
        </DrawerComponent>
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                {errorMsg && (
                  <Grid item sx={{ m: 2 }}>
                    <Collapse in={openErrorMsg}>
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpenErrorMsg(false);
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
                {children}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
