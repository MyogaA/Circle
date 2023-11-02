import { Box, FormControl, Text, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { IUserRegister } from "../../types/user";
import { API } from "../../libs/api";
import { useDispatch } from "react-redux";
export default function Register() {
  const [form, setForm] = useState<IUserRegister>({
    full_name: "",
    username: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await API.post('/auth/register', form)
      console.log(response?.data)
      dispatch((response?.data))
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

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
        <Text
          color={"green"}
          cursor={"pointer"}
          onClick={() => navigate("/login")}
        >
          Login
        </Text>
      </Box>
    </Box>
    </div>
  );
}
