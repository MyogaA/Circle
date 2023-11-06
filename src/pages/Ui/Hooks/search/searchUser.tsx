import { useState } from 'react';
import { RootState } from '../../../../Store/store';
import { useSelector } from 'react-redux';
import useFollow from '../Follow/SugestedHooks';


export function SearchUser() {
  const auth = useSelector((state: RootState) => state.auth);
  const [filter, setFilter] = useState('');
  const { User } = useFollow();
  const filteredUsers = User?.filter((users) => users.id !== auth.id);


  return {filter,setFilter,filteredUsers};
}