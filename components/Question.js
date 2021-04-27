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
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Answer from "./Answer";
import { useAuth } from "../contexts/auth";
import MainButton from "./shared/Button";
import { IoMdCreate, IoIosTrash } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import MainIcon from "./shared/Icon";

const Question = ({ question, onDelete }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <>
      <VStack
        mx="auto"
        shadow="lg"
        borderWidth="1px"
        rounded="md"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={3}
        w="100%"
        mb={8}
      >
        <Flex px={4} py={3} w="100%" justify="space-between" align="center">
          <Avatar name={question.user.username} bg="purple.500" color="white" />
          {user && user.id === question.userId ? (
            <Menu isLazy>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<MainIcon as={BsThreeDots} />}
                colorScheme="gray"
                variant="ghost"
              />
              <MenuList>
                <MenuItem icon={<MainIcon as={IoMdCreate} />}>Edit</MenuItem>
                <MenuItem
                  bg="red.300"
                  icon={<MainIcon as={IoIosTrash} />}
                  onClick={() => setIsOpen(true)}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </Flex>

        <Heading textAlign="center" p={4} marginBottom="">
          {question.question}
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} p={4} w="100%">
          {question.answers.map(answer => (
            <Answer key={answer.id} answer={answer} />
          ))}
        </SimpleGrid>
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
