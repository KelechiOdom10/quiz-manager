import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  VStack,
  SimpleGrid,
  StackDivider,
  Radio,
  useToast,
} from "@chakra-ui/react";
import MainButton from "./shared/Button";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { createQuestion } from "../config/api";

export default function QuestionForm() {
  const router = useRouter();
  const toast = useToast();
  const [values, setValues] = useState({
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    correct: "",
  });

  const { question, answer_1, answer_2, answer_3, answer_4, correct } = values;

  const body = {
    question,
    answers: [
      { answer: answer_1, isCorrect: answer_1 === correct },
      { answer: answer_2, isCorrect: answer_2 === correct },
      { answer: answer_3, isCorrect: answer_3 === correct },
      { answer: answer_4, isCorrect: answer_4 === correct },
    ],
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await createQuestion(body, toast);
    if (result) router.push("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="column" justifyContent="center" marginBottom={4}>
        <Heading
          as="h1"
          fontSize="lg"
          textAlign="center"
          marginTop={2}
          fontWeight="medium"
        >
          Create a new Question!
        </Heading>
      </Flex>

      <VStack
        mx="auto"
        divider={<StackDivider borderColor="gray.200" />}
        w="100%"
        mb={8}
        spacing={6}
      >
        <FormControl id="questionTitle" isRequired p={4}>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>Question</FormLabel>
          <Input
            type="text"
            name="question"
            value={question}
            onChange={handleChange}
            placeholder="Enter your Question"
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} p={4} w="100%">
          <FormControl id="answer_1" isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              First Answer
            </FormLabel>
            <Input
              type="text"
              name="answer_1"
              value={answer_1}
              onChange={handleChange}
              placeholder="First Answer"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <FormControl id="answer_2" isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Second Answer
            </FormLabel>
            <Input
              type="text"
              name="answer_2"
              value={answer_2}
              onChange={handleChange}
              placeholder="Second Answer"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <FormControl id="answer_3" isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Third Answer
            </FormLabel>
            <Input
              type="text"
              name="answer_3"
              value={answer_3}
              onChange={handleChange}
              placeholder="Third Answer"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <FormControl id="answer_4" isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Fourth Answer
            </FormLabel>
            <Input
              type="text"
              name="answer_4"
              value={answer_4}
              onChange={handleChange}
              placeholder="First Answer"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} p={4} w="100%">
          <Radio
            name="correct"
            onChange={handleChange}
            value={answer_1}
            isChecked={correct !== "" && correct === answer_1}
          >
            {answer_1 ? answer_1 : "answer 1"}
          </Radio>
          <Radio
            name="correct"
            onChange={handleChange}
            value={answer_2}
            isChecked={correct !== "" && correct === answer_2}
          >
            {answer_2 ? answer_2 : "answer 2"}
          </Radio>
          <Radio
            name="correct"
            onChange={handleChange}
            value={answer_3}
            isChecked={correct !== "" && correct === answer_3}
          >
            {answer_3 ? answer_3 : "answer 3"}
          </Radio>
          <Radio
            name="correct"
            onChange={handleChange}
            value={answer_4}
            isChecked={correct !== "" && correct === answer_4}
          >
            {answer_4 ? answer_4 : "answer 4"}
          </Radio>
        </SimpleGrid>

        <VStack spacing={6} w="100%">
          <MainButton type="submit" w="full">
            Create Question
          </MainButton>
          <MainButton
            colorScheme="red"
            variant="outline"
            w="full"
            onClick={e => {
              e.preventDefault();
              router.push("/home");
            }}
          >
            Cancel
          </MainButton>
        </VStack>
      </VStack>
    </form>
  );
}
