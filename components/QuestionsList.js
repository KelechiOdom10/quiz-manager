import { Box, Flex, Heading, Input, Stack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import Question from "./Question";
import { useAuth } from "../contexts/auth";
import { deleteQuestionById } from "../config/api";

const QuestionsList = ({ questionsList }) => {
  const [questions, setQuestions] = useState(questionsList);
  const toast = useToast();
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  let filteredQuestions = questions;

  if (searchValue.length > 0) {
    filteredQuestions = questions.filter(question =>
      question.question.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  const handleDelete = async id => {
    const result = await deleteQuestionById(id, toast);
    if (result) {
      setQuestions(questions.filter(question => question.id !== id));
    }
  };

  return (
    <Stack
      as="main"
      w={{ base: "85%", md: "70%" }}
      mx="auto"
      spacing={4}
      onChange={handleChange}
    >
      <Heading>
        Hello{" "}
        <Box as="span" role="username" color="purple.600">
          {user?.username}
        </Box>
      </Heading>
      <Input placeholder="Search for a specific question" />
      <Flex direction="column" align="center">
        {filteredQuestions.map(question => {
          return (
            <Question
              key={question.id}
              question={question}
              onDelete={handleDelete}
            />
          );
        })}
      </Flex>
    </Stack>
  );
};

export default QuestionsList;
