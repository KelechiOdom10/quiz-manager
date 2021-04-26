import { Flex, Image, Link, Box, useColorMode, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { Link as NextLink } from "next/link";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useAuth } from "../../contexts/auth";
import MainButton from "./Button";
import MainIcon from "./Icon";

const MenuItem = ({ children, isLast, to = "/", noDecoration }) => {
  return (
    <Link
      mb={{ base: isLast ? 0 : 5, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      fontSize={{ base: "sm", md: "md" }}
      fontWeight="medium"
      display="block"
      href={to}
      _hover={{
        textDecoration: noDecoration ? "none" : "underline",
      }}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <Flex
      as="nav"
      justify="space-between"
      p={8}
      mb={8}
      align="center"
      w="100%"
      wrap="wrap"
    >
      <Link href={user ? "/home" : "/"} w="10rem" cursor="pointer">
        <Image
          src="https://quizademia.com/images/logos/quizademia-large.png"
          alt="Quiz Manager Logo"
          loading="lazy"
        />
      </Link>
      <Box
        display={{ base: "block", md: "none" }}
        onClick={() => setShow(!show)}
        bg="purple.500"
        rounded="sm"
        color="white"
      >
        {show ? <MainIcon as={HiX} /> : <MainIcon as={HiMenuAlt3} />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={{ base: "center", md: "flex-end" }}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to={user ? "/home" : "/"}>Home</MenuItem>
          <MenuItem to="/about">About</MenuItem>

          {!user ? (
            <>
              <MenuItem to="/login">
                <MainButton variant="link">Sign In</MainButton>
              </MenuItem>

              <MenuItem to="/signup" isLast noDecoration>
                <MainButton variant="solid">Sign Up</MainButton>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem to="/create">Create Question</MenuItem>
              <MainButton variant="solid" onClick={logout}>
                Logout
              </MainButton>
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
