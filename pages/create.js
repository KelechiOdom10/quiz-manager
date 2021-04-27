import { Box } from "@chakra-ui/react";
import QuestionForm from "../components/QuestionForm";
import Footer from "../components/shared/Footer";
import Layout from "../components/shared/Layout";
import Navbar from "../components/shared/Navbar";
import withAuthentication from "../contexts/withAuthentication";

function Create() {
  return (
    <Layout
      title="Quiz Master | Create Quiz"
      description="Quiz Master - Create quizzes and participate"
    >
      <Box pb="150px">
        <Navbar />
        <Box
          w={{ base: "90%", md: "60%" }}
          mx="auto"
          shadow="lg"
          borderWidth="1px"
          rounded="md"
          p={4}
        >
          <QuestionForm />
        </Box>
      </Box>
      <Footer />
    </Layout>
  );
}

export default withAuthentication(Create);
