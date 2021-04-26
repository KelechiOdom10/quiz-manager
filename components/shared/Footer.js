import { Flex, Stack, Text, Link } from "@chakra-ui/react";
import MainIconButton from "./IconButton";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineInstagram,
} from "react-icons/ai";

const FooterLink = ({ to, icon, label }) => {
  return (
    <Link
      isExternal
      href={to}
      _hover={{
        textDecoration: "none",
      }}
    >
      <MainIconButton label={label} size="sm" isRound icon={icon} />
    </Link>
  );
};

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      bg="gray.50"
      position="absolute"
      bottom="0"
      left="0"
      w="100%"
      textAlign={{ base: "center", md: "left" }}
      h="100px"
      py={4}
      px={8}
      m="auto"
      direction={{ base: "column", md: "row" }}
      justify={{ base: "center", md: "space-between" }}
      align={{ base: "center", md: "center" }}
    >
      <Text fontSize={{ base: "sm", md: "md" }}>
        © {date} Quiz Manager. All rights reserved
      </Text>
      <Stack direction={"row"} spacing={6} mt={{ base: 4, md: 0 }}>
        <FooterLink
          to="https://github.com/KelechiOdom10/quiz-manager"
          label="Visit my GitHub Account"
          icon={AiOutlineGithub}
        />

        <FooterLink
          to="https://www.linkedin.com/in/kelechi-odom-065308157/"
          icon={AiOutlineLinkedin}
          label="Visit my LinkedIn Account"
        />

        <FooterLink
          to="#"
          label="Visit my Instagram Account"
          icon={AiOutlineInstagram}
        />
      </Stack>
    </Flex>
  );
};

export default Footer;
