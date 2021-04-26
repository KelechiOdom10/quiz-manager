import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Flex,
  Circle,
  InputRightElement,
  Text,
  Link,
  Stack,
} from "@chakra-ui/react";
import MainButton from "./shared/Button";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import MainIconButton from "./shared/IconButton";
import React, { useState } from "react";
import { useAuth } from "../contexts/auth";

export default function LoginForm() {
  const { login } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const [show, setShow] = useState(false);

  const toggle = e => {
    e.preventDefault();
    setShow(!show);
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="column" justifyContent="center" marginBottom={4}>
        <Link href="/" alignSelf="center" _hover={{ textDecoration: "none" }}>
          <Circle size="60px" bg="purple.500" color="white">
            Q
          </Circle>
        </Link>

        <Text
          as="h2"
          fontSize="lg"
          textAlign="center"
          marginTop={2}
          fontWeight="medium"
        >
          Welcome Back!
        </Text>
      </Flex>

      <Stack spacing={6}>
        <FormControl id="email" isRequired>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>
            Email address
          </FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleChange}
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
              fontSize={{ base: "sm", md: "md" }}
            />
            <InputRightElement width="3rem">
              <MainIconButton
                h="1.75rem"
                size="sm"
                onClick={toggle}
                colorScheme="gray"
                icon={show ? AiOutlineEyeInvisible : AiOutlineEye}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <MainButton type="submit" w="full">
          Sign In
        </MainButton>{" "}
      </Stack>

      <Box>
        <Text fontSize={{ base: "sm", md: "md" }}>
          Don't have an account?{" "}
          <Link color="purple.500" fontWeight="bold" href="/signup">
            Sign Up
          </Link>
        </Text>
      </Box>
    </form>
  );
}
