import { Card, Flex, Box, Text, Avatar, Image } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { API } from '../../../../libs/api';
import { useQuery } from 'react-query';
import ReplyDetail from './ReplyDetail';

interface Data {
  id: number;
  image: string;
  content: string;
  // created_at: string;
  user: {
    username: string;
    full_name: string;
  };
}

export default function ReplyUi() {
  const params = useParams();

  const {
    data: DetailThread,
    isLoading,
  } = useQuery({
    queryKey: ['thread', params.id],
    queryFn: async () => {
      const { data } = await API.get(`/thread/${params.id}`);
      return data;
    },
  });
  
  return (
    <div>
      {isLoading ? (
        <Box>Loading...</Box>
      ) : (
        <Box w={'full'}>
          <Card w={'full'} mb={2} p={6} bgColor={'#222'} boxShadow="xl" color={'white'}>
            <Flex>
              <Avatar />
              <Box ml={4} w={'full'} mt={3}>
                <Flex>
                  <Text fontSize="xs" mr={2} fontWeight="bold">
                  {DetailThread.users ? DetailThread.users.full_name : 'Nama tidak tersedia'}
                  </Text>
                  <Text fontSize="xs" mr={2} color="gray.400">
                  @{DetailThread.users ? DetailThread.users.username : 'Nama tidak tersedia'}
                  </Text>
                  {/* <Text fontSize="xs" color="gray.400">
                    • {DetailThread.created_at}
                  </Text> */}
                </Flex>
                <Text fontSize="xs" mt={4}>
                  {DetailThread.content}
                </Text>
                <Box h={'300px'} w={'full'} mt={4}>
                  <Image src={DetailThread.image} h={'full'} w={'full'} objectFit={'contain'} style={{ borderRadius: '5px' }} />
                </Box>
                <Box alignItems="center" mt={4}>
                </Box>
              </Box>
            </Flex>
          </Card>
          <Box>
            <Box>
              <ReplyDetail />
            </Box>
            {/* Replies */}
            <Card p={4} bgColor={'#222'} boxShadow="xl" color={'white'}>
              <Text fontWeight={'bold'}>{DetailThread.replies?.length} Replies </Text>
              {DetailThread.replies?.map((item: Data) => (
                <Box key={item.id} p={10} boxShadow="xl">
                  <Flex gap={4}>
                    <Avatar />
                    <Box mt={2}>
                      <Flex gap={4} mt={2}>
                        <Flex gap={1}>
                          <Text fontSize={'xs'} fontWeight={'bold'}>{item.user.full_name}</Text>
                          <Text fontSize={'xs'} color="white">
                            @{item.user.username}
                          </Text>
                        </Flex>
                        {/* <Text fontSize={'xs'} color="gray.400">
                          • {item.created_at}
                        </Text> */}
                      </Flex>
                      <Box mt={4} ml={4} display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'center'}>
                        <Text mb={2} fontSize={'xs'}>
                          {item.content}
                        </Text>
                        <Box h={'50px'} >
                          <Image src={item.image} h={'full'} w={'full'} objectFit={'contain'} style={{ borderRadius: '5px' }} />
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Card>
          </Box>
        </Box>
      )}
    </div>
  );
}