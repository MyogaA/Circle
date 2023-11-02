import { Button, Flex, Image, Box, Text } from "@chakra-ui/react";
import FollowHooks from "./component/Hooks/FollowHooks";

export default function Follow({item}:{item: any}) {
  
  const { handleFollow } = FollowHooks();

  return (
    <Flex
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      key={item.id}
    >
      <Box
        width="70%"
        height="300px"
        border="1px solid white"
        borderRadius={10}
        p={4} 
        textAlign="center" 
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap={2} alignItems="center">
            <Image
              src="https://source.unsplash.com/random/400x400"
              alt=""
              w="30px"
              h="30px"
              borderRadius="full"
            />
            <Box>
              <Text fontSize="11px" color="white">
                {item.full_name}
              </Text>
              <Text fontSize="11px" color="#797979">
                {item.username}
              </Text>
            </Box>
          </Flex>
          <Button
            variant="outline"
            color="white"
            fontSize="11px"
            px={3}
            py="1.5px"
            borderRadius="full"
            onClick={() => {
    console.log("Follow clicked with data:", item.id, item.user_id, item.is_followed);
    handleFollow(item.id, item.user_id, item.is_followed);
  }}
          >
            Follow
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
