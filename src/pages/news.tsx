import type { GetServerSideProps } from 'next';
import * as React from 'react';
import { MainLayout } from '@/components/MainLayout';
import { titleState } from '@/states/title';
import { useRecoilState } from 'recoil';
import { sessionProps } from '@/utils/session';
import { Box, Grid, Link, List, ListItem, Paper, Typography } from '@mui/material';
import { trpc } from '@/utils/trpc';

/**
 * News Page
 * Gets rss feed from api and displays it on the page
 */
export default function NewsPage() {
  const [_, setTitle] = useRecoilState(titleState);
  setTitle('News');

  const { data: feed, refetch, isLoading } = trpc.useQuery(['feed.get']);

  return (
    <MainLayout>
      <>
        <List>
          {feed?.items.map(element => {
            if ('media' in element) {
              console.log(element);
              return (
                <LinkCard
                  img={element?.media['$'].url}
                  imgAlt={element?.title}
                  url={element?.link}
                  title={element?.title}
                  body={element?.description}
                />
              );
            }
          })}
        </List>
      </>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = sessionProps;

type Props = {
  img?: string;
  imgAlt?: string;
  url?: string;
  title?: string;
  body?: string;
};

const LinkCard: React.FC<Props> = ({ img, imgAlt, url, title, body }: Props) => {
  return (
    <ListItem sx={{ width: '100%' }}>
      <Paper elevation={4} sx={{ p: 2, bgcolor: 'primary.light', margin: 'auto', flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box
              component="img"
              sx={{
                height: '100%',
                width: '100%',
              }}
              alt={imgAlt}
              src={img}
            />
          </Grid>
          <Grid item xs={7} container>
            <Grid item container direction="column" spacing={2}></Grid>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="body2">{body}</Typography>
            <Typography variant="subtitle2">
              <Link href={url}>read more...</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </ListItem>
  );
};
