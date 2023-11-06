import { Box, Button, Card, Input, Text } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { SuggestedCard } from '../Sidebar/SugestedFollow';
import { IUser } from '../../../../Store/types/user';
import { useState } from 'react';
import { SearchUser } from '../../Hooks/search/searchUser';

export function SearchList() {
  const { filter, setFilter, filteredUsers } = SearchUser();

  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleFilterButtonClick = () => {
    setIsFilterActive(true);
  };

  return (
    <Box>
      <Card w="100%" p={6} bgColor={'#222'} boxShadow="lg" color={'white'}>
        <Box position={'fixed'} w={'45%'} top={0} bgColor={'#222'} pt={14}>
          <Text mb={6} fontWeight={'bold'} fontSize={'xl'}>
            Search
          </Text>
          <Box w={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search"
              size="sm"
              border={'none'}
              mt={2}
              borderBottom={'1px solid gray'}
              w={'90%'}
              focusBorderColor="#222"
            />
            <Button onClick={handleFilterButtonClick} colorScheme="green" size={'sm'} mt={2}>
              <AiOutlineSearch />
            </Button>
          </Box>
        </Box>
        <Box className="follow" w="100%" h="screen" mt={150}>
          {isFilterActive &&
            filteredUsers
              ?.filter((users) => users?.full_name?.toLowerCase().includes(filter))
              .map((item: IUser) => <SuggestedCard key={item.id} id={item.id} full_name={item.full_name} username={item.username} />)}
        </Box>
      </Card>
    </Box>
  );
}
