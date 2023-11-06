import { Box, FormControl, Text, Input, Button } from "@chakra-ui/react";
import handleRegister from "../Hooks/handleRegister";

function RegisterForm() {
  const { handleChange,navigate  } = handleRegister()
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
          <Text color={"brand.green"} fontSize={"2xl"} fontWeight={"bold"}>
            Connect
          </Text>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Create Account Connect
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
          <Text color={"green"} cursor={"pointer"} onClick={() => navigate("/login")}>
            Login
          </Text>
        </Box>
      </Box>
    </div>
  );
}

export default RegisterForm;
