import axios from 'axios';
import useSWR from 'swr';

export default function useUser() {
  const fetcher = (url: string, token: string) =>
    axios.get(url, { headers: { Authorization: 'Bearer ' + token } }).then(r => r.data);
  const { data, mutate } = useSWR('/api/auth/user', key => {
    const token = localStorage.getItem('token');
    if (token != null) return fetcher(key, token);
  });
  // if data is not defined, the query has not completed
  const loading = !data;
  const user = data?.username;
  return [user, { mutate, loading }];
}
