import { getSession, GetSessionParams } from 'next-auth/react';

export const sessionProps = async (context: GetSessionParams | undefined) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
