import type { GetServerSideProps } from 'next';
import * as React from 'react';
import { MainLayout } from '@/components/MainLayout';
import { titleState } from '@/states/title';
import { useRecoilState } from 'recoil';
import { trpc } from '@/utils/trpc';
import { sessionProps } from '@/utils/session';
import { List, Paper, ListItem, Grid, Typography } from '@mui/material';

export default function MarketsPage() {
  const [_, setTitle] = useRecoilState(titleState);
  setTitle('News');

  const { data: movers, isLoading } = trpc.useQuery(['market.get-movers']);

  if (isLoading) return;
  const dayGainers = movers.finance.result[0];
  const dayLoser = movers.finance.result[1];
  const mostActive = movers.finance.result[2];

  return (
    <MainLayout>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4}>
          <List>
            <Paper>
              <ListItem sx={{ p: 1 }}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography sx={{ p: 1 }} justifyContent="center">
                      {dayGainers.title}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {dayGainers.quotes.map((quote: any) => {
                return (
                  <ListItem sx={{ p: 1 }} key={quote.symbol}>
                    <Grid container justifyContent="center">
                      <Grid item>{quote.symbol}</Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </Paper>
          </List>
        </Grid>
        <Grid item xs={4}>
          <List>
            <Paper>
              <ListItem sx={{ p: 1 }}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography sx={{ p: 1 }} justifyContent="center">
                      {mostActive.title}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {mostActive.quotes.map((quote: any) => {
                return (
                  <ListItem sx={{ p: 1 }} key={quote.symbol}>
                    <Grid container justifyContent="center">
                      <Grid item>{quote.symbol}</Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </Paper>
          </List>
        </Grid>
        <Grid item xs={4}>
          <List>
            <Paper>
              <ListItem sx={{ p: 1 }}>
                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography sx={{ p: 1 }} justifyContent="center">
                      {dayLoser.title}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {dayLoser.quotes.map((quote: any) => {
                return (
                  <ListItem sx={{ p: 1 }} key={quote.symbol}>
                    <Grid container justifyContent="center">
                      <Grid item>{quote.symbol}</Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </Paper>
          </List>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = sessionProps;
