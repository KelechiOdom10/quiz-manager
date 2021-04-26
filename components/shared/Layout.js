import { Box } from "@chakra-ui/layout";
import Head from "next/head";
const Layout = ({ children, title, description, ...props }) => (
  <Box minH="100vh" position="relative" {...props}>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/quiz.ico" type="image/x-icon" />
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      ></link>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />
      <meta name="description" content={description} />
    </Head>
    {children}
  </Box>
);

export default Layout;
