import { Home, Search, Heart, UserCircle } from 'lucide-react';
import { Text, HStack, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
export function Navbar() {
  return (
    <div>
      <Text fontSize={"40px"} padding={"5"} fontWeight={"bold"} color={"green.500"}>
        Circle
      </Text>
      <HStack p={"5"}>
        <Home size={"30"} color="white" />
        <Link to={'/'}>

        <Button colorScheme="transparent">
          Home
        </Button>
        </Link>
      </HStack>
      <HStack p={"5"}>
        <Search size={"30"} color="white" />
        <Link to={'/SearchUser'}>
        <Button colorScheme="transparent">
          Search
        </Button>
        </Link>
      </HStack>
      <HStack p={"5"}>
        <Heart size={"30"} color="white" />
        <Link to={'/follow'}>
        <Button colorScheme="transparent">
          Follow
        </Button>
        </Link>
      </HStack>
      <HStack p={"5"}>
        <UserCircle size={"30"} color="white" />
        <Link to={'/MyProfile'}>
        <Button colorScheme="transparent">
          Profile
        </Button>
        </Link>
      </HStack>
      <Button variant={"outline"} colorScheme='green' color={"green"} borderRadius={"50px"} width={"80%"} ml={3} p={5}
        _hover={{
          backgroundColor: "green.500",
          color: "black",
        }}
      >
        Create Post
      </Button>
     
    </div>
  );
}
