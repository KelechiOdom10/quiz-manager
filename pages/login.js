import { Box, Flex } from "@chakra-ui/layout";
import LoginForm from "../components/LoginForm";
import Layout from "../components/shared/Layout";

const Login = () => {
  return (
    <Layout
      title="Quiz Master | Sign in"
      description="Quiz Master Sign in Page"
      display="flex"
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        w="50vw"
        display={{ base: "none", md: "flex" }}
        bg="purple.500"
      ></Flex>
      <Flex
        w={{ base: "100%", md: "50vw" }}
        align={{ base: "start", md: "center" }}
        mx="auto"
        mt={{ base: 20, md: 0 }}
      >
        <Box w="80%" mx="auto">
          <LoginForm />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Login;
