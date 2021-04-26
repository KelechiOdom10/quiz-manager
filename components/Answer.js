import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../contexts/auth";

const Answer = ({ answer }) => {
  return (
    <Text
      py={3}
      px={8}
      rounded="md"
      textAlign="center"
      borderWidth={answer.isCorrect ? 0 : 1}
      bg={answer.isCorrect ? "purple.500" : "white"}
      color={answer.isCorrect ? "white" : "black"}
    >
      {answer.answer}
    </Text>
  );
};

export default Answer;
