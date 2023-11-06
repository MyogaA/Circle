import { Box, Card, Text, Avatar, Flex, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import useFollow from '../../Hooks/Follow/SugestedHooks';
import { IUser, follow } from '../../../../Store/types/user';
import { AUTH_CHECK, RootState } from '../../../../Store/store';
import { API } from '../../../../libs/api';

interface IFollow {
  userId?: number;
  id: number | undefined;
  full_name?: string;
  username?: string;
  follow?: follow[];
}

export function SuggestedCard(props: IFollow) {
  const { full_name, username, id } = props;
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const [followId, setFollowId] = useState({
    followingId: id,
  });

  const queryClient = useQueryClient();

  const { mutate: handleFollow } = useMutation({
    mutationFn: () => {
      return API.post(`/follow`, followId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      const response = await API.get('/auth/check');
      dispatch(AUTH_CHECK(response.data.user));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handleClick() {
    setFollowId({ followingId: id });
    handleFollow();
  }

  const isFollowing = auth.following?.some((follow: follow) => follow.id === id);

  return (
    <Flex justifyContent="space-between" mb={2} alignItems={'center'}>
      <Box>
        <Flex key={id} alignItems={'center'}>
          <Avatar src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <Box ml={2}>
            <Text fontSize="xs" fontWeight={'bold'}>
              {full_name}
            </Text>
            <Text fontSize="xs" color={'gray.400'}>
              {username}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Box>
          {isFollowing ? (
            <Button
              onClick={handleClick}
              colorScheme="whiteAlpha"
              color="white"
              size="xs"
              rounded="full"
              variant="outline"
              w="fit-content"
              opacity="70%">
              Unfollow
            </Button>
          ) : (
            <Button onClick={handleClick} colorScheme="whiteAlpha" color="white" size="xs" rounded="full" variant="outline"  w="fit-content">
              Follow
            </Button>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default function Suggested() {
  const auth = useSelector((state: RootState) => state.auth);

  const { User } = useFollow();
  const filteredUsers = User?.filter((user) => user.id !== auth.id);

  return (
    <Box>
      <Card w="100%" p={6} bgColor={'#222'} boxShadow="lg" color={'white'}>
        <Text mb={6} fontWeight={'bold'} fontSize={'xl'}>
          Suggested for you
        </Text>
        <Box className="follow" w="100%" h="200px" overflow="auto">
          {filteredUsers?.map((item: IUser) => (
            <SuggestedCard key={item.id} id={item.id} full_name={item.full_name} username={item.username} />
          ))}
        </Box>
      </Card>
    </Box>
  );
}