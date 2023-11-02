import {
  Text,
  HStack,
  FormControl,
  Image,
  Box,
  Avatar,
  Button,
  Heading,
  Input,
  Flex,
} from "@chakra-ui/react";
import { ImagePlus, MessageSquare, Dot } from "lucide-react";
import PostHooks from "./component/Hooks/PostHooks";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
// import { useDispatch } from "react-redux";
// import { AUTH_LOGOUT } from "../../Store/store";
// // import { useNavigate } from 'react-router-dom';
// import { useState } from "react";


export default function Post(props: any) {

  const {
    handlePost,
    handleLike,
    handleChange,
    fileInputRef,
    handlePostClick,
    handleLogout,
    isLoading,
    isError,
    isLiked,
    getPosts,
  } = PostHooks(props);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mt={5} alignItems="center" w="180%" gap="30px">
        <Heading color="white">
          Home
        </Heading>
        <Flex onClick={handleLogout} style={{ cursor: "pointer" }}>
        <BiLogOutCircle color="red" size="30px" />
        </Flex>
        Logout
      </Box>
      <HStack p={3}>
        <Avatar size="sm" />
        <form onSubmit={handlePost} encType="multipart/form-data">
          <FormControl display="flex" flexDirection="column" gap={2} bg="transparent" color="white">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Input
                placeholder="Isikan apa yang kamu pikirkan..."
                name="content"
                onChange={handleChange}
              />
              <Button variant="ghost" color="brand.green" onClick={handlePostClick}
                _hover={{
                  // backgroundColor: "blue.500",
                  color: "white",
                }}
              >
                <ImagePlus style={{ height: "50px", width: "50px" }} />
              </Button>
              <Input
                type="file"
                name="image"
                onChange={handleChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <Box display="flex" justifyContent="end">
                <Button variant={"outline"} colorScheme="green" type="submit"
                  _hover={{
                    backgroundColor: "green.500",
                    color: "black",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </FormControl>
        </form>
      </HStack>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        getPosts?.map((postItem: any) => (
          <Box display="flex" m={5} key={postItem.id}>
            <Image mt={3} src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" objectFit="cover" borderColor="black" boxSize="40px" borderRadius="full" />
            <Box display="flex" flexDirection="column" mt={3}>
              <Box display="flex" flexDirection="row">
                <Text ml={5} textColor="white" fontSize="lg">
                  {postItem.users?.full_name}
                </Text>
                <Text mt={1} ml="5px" color="grey" fontSize="sm">
                  {postItem.users?.username}
                </Text>
                <Dot color="grey" />
              </Box>
              <Box>
                <Image ml={5} boxSize="300px" width="500px" borderRadius={10} src={postItem.image} alt="Post Image" />
              </Box>
              <Text ml={5} color="white">
                {postItem.content}
              </Text>
              <Box display="flex">
              <Flex gap={2}alignItems="center" cursor="pointer" mt={2} onClick={() => handleLike(postItem.id, postItem.users.id,!isLiked)}>
            {isLiked ? <AiFillHeart size={30} color="red" /> : <AiOutlineHeart size={30} color="white"/>}
            <Text color={"white"} fontSize="sm">{postItem.likes?.length || 0}</Text>
          </Flex>
                <Box display="flex" fontSize="sm" mt={3} ml={5} color="white">
                  <MessageSquare />
                  <Text ml={2} color="white" fontSize="sm">
                    {postItem.reply?.length || 0} Balasan
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </div>
  );
}
