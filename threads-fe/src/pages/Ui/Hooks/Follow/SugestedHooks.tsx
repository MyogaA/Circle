import { useQuery } from "react-query";
import { IUser } from "../../../../Store/types/user";
import { API } from "../../../../libs/api";



export default function useFollow() {
  const { data: User, } = useQuery<IUser[]>({
    queryKey: ['users'],
    queryFn: async () => await API.get('/users').then((res) => res.data),
  });
  return { User };
  console.log(User);
  
}


export function useFollowing() {
  const {
    data: userFollowData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await API.get('/users');
      return data;
    },
  });

  return { userFollowData, isLoading, error };
}