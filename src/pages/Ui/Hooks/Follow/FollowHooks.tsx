// import { useDispatch, useSelector } from "react-redux";
// import { AUTH_CHECK, RootState } from "../../../../Store/store";
// import { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "react-query";
// import { API } from "../../../../libs/api";
// import { follow } from "../../../../types/user";
// import { User } from "./PostHooks";

// interface IFollow {
//   userId?: number;
//   id: number;
//   full_name?: string;
//   username?: string;
//   follow?: follow[];
// }

// export function FollowHooks(props: IFollow) {
//   const { full_name, username, id } = props;
//   const dispatch = useDispatch();
//   const auth = useSelector((state: RootState) => state.auth);

//   const [followId, setFollowId] = useState({
//     followingId: id,
//   });

//   const queryClient = useQueryClient();

//   const { mutate: handleFollow } = useMutation({
//     mutationFn: () => {
//       return API.post(`/follow`, followId);
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//       const response = await API.get('/auth/check');
//       dispatch(AUTH_CHECK(response.data.user));
//     },
//     onError: (err) => {
//       console.log(err);
//     },
//   });

//   function handleClick() {
//     setFollowId({ followingId: id });
//     handleFollow();
//   }

//   const isFollowing = auth.following?.some((follow: follow) => follow.id === id);

//   return {
//     handleClick,
//   };

// }
// export default function useFollow() {
//   const { data: User } = useQuery<User[]>({
//     queryKey: ['users'],
//     queryFn: async () => await API.get('/users').then((res) => res.data),
//   });
//   return { User };
// }

// export function useFollowing() {
//   const {
//     data: userFollowData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['users'],
//     queryFn: async () => {
//       const { data } = await API.get('/users');
//       return data;
//     },
//   });

//   return { userFollowData, isLoading, error };
// }