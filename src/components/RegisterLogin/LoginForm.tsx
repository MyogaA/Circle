import { FormControl, Input, Button, Box, Text } from '@chakra-ui/react';
import { useLogin } from '../../components/Hooks/HandleLogin';
export default function FormLogin() {
    const { handleChange, handleLogin } = useLogin()
  
{

  return (
    <div>

    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
      pt={100}
      height={"100vh"}
    >
      <FormControl
        isRequired
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        width={"350px"}
        bg={"transparent"}
        color={"white"}
        border={"1px solid white"}
        borderRadius={10}
        padding={5}
      >
        <Text color={"brand.green"}p={5} textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
          Login
        </Text>
        <Input
          placeholder="Email"
          name="email"
          id='email'
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          id='password'
        />
        <Button
          backgroundColor={"green"}
          colorScheme="green"
          color={"white"}
          onClick={handleLogin}
        >
          Login
        </Button>
      </FormControl>
    </Box>
    </div>
  );
};

}