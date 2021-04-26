import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../contexts/auth";

const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif;",
    body: "'Poppins', sans-serif;",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
