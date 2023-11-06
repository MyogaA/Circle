import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AUTH_CHECK, RootState } from '../../../../Store/store';
import { useMutation, useQueryClient } from 'react-query';
import { API } from '../../../../libs/api';

export function useUpdateProfile() {
  const auth = useSelector((state: RootState) => state.auth);
  const id = Number(auth.id);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const [profile, setProfile] = useState({
    full_name: auth.full_name || '',
    username: auth.username || '',
    email: auth.email || '',
    bio: auth.bio || '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  }

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await API.patch(`/user/${id}`, profile);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      const response = await API.get('/auth/check');
      dispatch(AUTH_CHECK(response.data.user));

      console.log('update berhasil');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    profile,
    setProfile,
    mutate,
    handleChange,
  };
}