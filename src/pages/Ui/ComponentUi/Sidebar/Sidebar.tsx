import { Text, HStack, Button } from "@chakra-ui/react";
import { Avatar, Image, Box, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AUTH_LOGIN, RootState } from "../../../../Store/store";
import Suggested from "./SugestedFollow";
import { Link } from "react-router-dom";

export function Sidebar() {
    const data = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    console.log(data);


    // Mengambil data pengguna dari localStorage jika tidak ada di Redux
    useEffect(() => {
        if (!data) {
            const userString = localStorage.getItem('user');
            if (userString) {
                const user = JSON.parse(userString);
                dispatch(AUTH_LOGIN(user));
            }
        }
    }, [data, dispatch]);


    return (
        <div style={{ position: "fixed", width: "65vh" }}>
            <Box mb={2} width={"full"} borderRadius={"5px"} boxShadow='lg' p='6' rounded='md' bg='#262626' height={"300px"}>
                <Text>
                    My Profile
                </Text>
                <Box pos="relative">
                    <Image
                        objectFit="cover"
                        width="full"
                        filter="blur(1px)"
                        borderRadius="10px"
                        height="100px"
                        src='https://media.istockphoto.com/id/1341408852/video/colored-smoke-on-a-dark-background-blue-and-red-light-with-smoke.jpg?s=640x640&k=20&c=v2DQUY8IVbli_6FH_9KAs6YWRXlDdYiBJHfp7JFh7NY=' />
                    <Image
                        objectFit="cover"
                        border={"2px"}
                        borderColor={"black"}
                        boxSize="50px"
                        borderRadius="full"
                        position="absolute"
                        top="20"
                        left={"4"}
                        src='https://cdn.pnghd.pics/data/90/dev-avatar-17.jpg' />
                    <Link to={'/EditProfile'}>
                    <Button pos={"absolute"} right={"0"} mt={"8px"} borderRadius={"50px"} variant={"outline"} textColor={"white"} size={"sm"}>
                           Edit Profile
                        </Button>
                    </Link>
                    <Box display={"flex"} mt={"40px"} flexDirection={"column"}>
                        <Heading size={"md"}>
                            {data?.full_name}
                        </Heading>
                        <Text fontSize={"12px"} fontWeight={"thin"} textColor={"grey"}>
                            {data?.username}
                        </Text>
                        <Text>
                            {data?.bio}
                        </Text>
                        <HStack>
                            <Text fontSize={"11px"}>
                                {data.following?.length}
                            </Text>
                            <Text color={"grey"} fontSize={"12px"}>
                                Following
                            </Text>
                            <HStack p={4}>
                                <Text fontSize={"11px"}>
                                    {data.followers?.length}
                                </Text>
                                <Text color={"grey"} fontSize={"12px"}>
                                    Followers
                                </Text>
                            </HStack>
                        </HStack>
                    </Box>
                </Box>
                <Box>
                </Box>
            </Box>

            <Suggested />
            <Box width={"full"} borderRadius={"5px"} boxShadow='lg' rounded='md' bg='#262626' height={"100px"} mt={2}>
                <Text display={"flex"} justifyContent={"center"} alignContent={"center"}>
                    Design By Meta
                </Text>
            </Box>
        </div>
    );
}
