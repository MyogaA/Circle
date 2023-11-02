import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';

const token = useSelector((state: RootState) => state.user.token);

console.log(token);
