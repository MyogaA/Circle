import { Box, FormControl, Text, Input, Button } from "@chakra-ui/react";
import useRegister from "../Hooks/handleRegister";

function RegisterForm() {
  const { handleChange, handleRegister,navigate } = useRegister();
  return (
    <div style={{ backgroundImage: "url(../../assets/background.jpg)", backgroundSize: 'cover' }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
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
          <Text color={"brand.green"} fontSize={"2xl"} fontWeight={"bold"}>
            Thread
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Create Account Thread
          </Text>
          <Input
            placeholder="First name"
            name="full_name"
            onChange={handleChange}
          />
          <Input
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <Button
            backgroundColor={"green"}
            colorScheme="green"
            color={"white"}
            onClick={handleRegister}
          >
            Create
          </Button>
        </FormControl>
        <Box display={"flex"} gap={2}>
          <Text color={"white"}>Already have an account?</Text>
          <Text color={"blue"} cursor={"pointer"} onClick={() => navigate("/login")}>
            Login
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default RegisterForm;
