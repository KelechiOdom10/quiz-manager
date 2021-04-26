import { Box } from "@chakra-ui/react";
import Hero from "../components/Hero";
import Footer from "../components/shared/Footer";
import Layout from "../components/shared/Layout";
import Navbar from "../components/shared/Navbar";

export default function Home() {
  return (
    <Layout
      title="Quiz Master | Quizzes for developers"
      description="Quiz Master - Learn and teach others via quizzes"
    >
      <Box pb="100px">
        <Navbar />
        <Hero />
      </Box>
      <Footer />
    </Layout>
  );
}
