import {
  Heading,
  SimpleGrid,
  StackDivider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Answer from "./Answer";
import { useAuth } from "../contexts/auth";
import MainButton from "./shared/Button";
import MainIconButton from "./shared/IconButton";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

const Question = ({ question, onDelete }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <>
      <VStack
        _hover={{ transform: "scale(1.03)" }}
        transition="transform .4s ease-in-out"
        mx="auto"
        shadow="lg"
        borderWidth="1px"
        rounded="md"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={3}
        w="100%"
        mb={8}
      >
        <Heading textAlign="center" p={4} marginBottom="">
          {question.question}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} p={4} w="100%">
          {question.answers.map(answer => (
            <Answer key={answer.id} answer={answer} />
          ))}
        </SimpleGrid>

        {user && user.id === question.userId ? (
          <HStack px={4} py={3} w="100%" spacing={4}>
            <MainIconButton
              icon={IoMdCreate}
              colorScheme="purple"
              variant="ghost"
              label="Edit Question"
            />
            <MainIconButton
              icon={IoIosTrash}
              colorScheme="red"
              variant="ghost"
              onClick={() => setIsOpen(true)}
              label="Delete Question"
            />
          </HStack>
        ) : null}
      </VStack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Question
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <MainButton variant="outline" refs={cancelRef} onClick={onClose}>
                Cancel
              </MainButton>
              <MainButton
                colorScheme="red"
                onClick={() => {
                  onDelete(question.id);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </MainButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Question;
