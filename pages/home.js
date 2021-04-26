import { Box } from "@chakra-ui/react";
import QuestionsList from "../components/QuestionsList";
import Footer from "../components/shared/Footer";
import Layout from "../components/shared/Layout";
import Navbar from "../components/shared/Navbar";
import { server } from "../config";
import withAuthentication from "../contexts/withAuthentication";

function Main({ questions }) {
  return (
    <Layout
      title="Quiz Master | Home Page"
      description="Quiz Master - Learn and teach others via quizzes"
    >
      <Box pb="100px">
        <Navbar />
        <QuestionsList questionsList={questions} />
      </Box>
      <Footer />
    </Layout>
  );
}

export default withAuthentication(Main);

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/questions`);
  const { data: questions } = await res.json();

  return {
    props: { questions }, // will be passed to the page component as props
  };
}
