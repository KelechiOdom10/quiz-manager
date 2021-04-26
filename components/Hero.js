import { Box, Image, Flex, Text, Link } from "@chakra-ui/react";
import MainButton from "./shared/Button";

export default function Hero() {
  return (
    <Flex as="section" align="center" justify="center" p={8} mx="auto">
      <Flex
        direction="column"
        alignItems={{ base: "center", md: "start" }}
        textAlign={{ base: "center", md: "start" }}
        justifyContent="center"
        px={{ base: 4, lg: 20 }}
      >
        <Text
          as="h1"
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="extrabold"
          mb={6}
        >
          A{" "}
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "purple.400",
              zIndex: -1,
            }}
          >
            Quiz
          </Text>{" "}
          a day saves lives
        </Text>
        <Link
          href="/login"
          _hover={{
            textDecoration: "none",
          }}
        >
          <MainButton w="full" mt={2} variant="solid" size="lg">
            Get Started
          </MainButton>
        </Link>
        <Text
          as="p"
          bgGradient="linear(to-l, pink.600, purple.600)"
          bgClip="text"
          fontSize="sm"
          fontStyle="italic"
          letterSpacing="wider"
          fontWeight="bold"
          mt={6}
        >
          Get the #1 Quiz manager and start delivering personalized experiences
          to your peers.
        </Text>
      </Flex>
      <Box display={{ base: "none", lg: "flex" }}>
        <Image
          src="https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
          alt="3 women looking at a laptop"
          fit="cover"
          w="full"
          h={{ base: 64, md: "full" }}
          bg="gray.100"
          loading="lazy"
        />
      </Box>
    </Flex>
  );
}
