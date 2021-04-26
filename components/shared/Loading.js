import { Flex } from "@chakra-ui/react";
import MainIcon from "./Icon";
import { VscLoading } from "react-icons/vsc";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const LoadingScreen = () => {
  return (
    <MotionFlex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      animate={{ rotate: 360 }}
      transition={{ duration: 2 }}
    >
      <MainIcon as={VscLoading} color="purple.500" w={20} h={20} />
    </MotionFlex>
  );
};

export default LoadingScreen;
