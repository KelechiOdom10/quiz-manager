import { Box, Flex } from "@chakra-ui/layout";
import SignupForm from "../components/SignupForm";
import Layout from "../components/shared/Layout";

const Login = () => {
  return (
    <Layout
      title="Quiz Master | Sign up"
      description="Quiz Master Sign up Page"
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
        mt={{ base: 16, md: 0 }}
      >
        <Box w="80%" mx="auto">
          <SignupForm />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Login;
