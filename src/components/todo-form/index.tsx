import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AiTwotoneEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Todo } from "../../App";

interface FormData {
  title: string;
  category: string;
}

interface Props {
  length: number;
  addTodo: (Todo: Todo) => void;
}

const TodForm = ({ length, addTodo }: Props) => {
  const color = useColorModeValue("gray.200", "gray.700");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const onAddTodo = (data: FormData) => {
    addTodo({
      id: length + 1,
      category: data.category,
      title: data.title,
      done: false,
    });

    console.log(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<Icon as={AiTwotoneEdit} boxSize={5} />}
        colorScheme="pink"
        variant="solid"
      >
        Add New Todo
      </Button>

      <Modal
        size={{ base: "xs", sm: "md" }}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Todo Form</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onAddTodo)}>
            <ModalBody>
              <Stack gap={4}>
                <FormControl isRequired isInvalid={!!errors.title}>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    id="title"
                    {...register("title", {
                      required: "This field is required",
                      minLength: {
                        value: 3,
                        message: "Minimum length should be 3",
                      },
                    })}
                    placeholder="Add Todo"
                    bg={color}
                  />
                  {errors.title?.type === "required" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      This field is required
                    </FormErrorMessage>
                  )}
                  {errors.title?.type === "minLength" && (
                    <FormErrorMessage>
                      <FormErrorIcon />
                      Minimum length should be 3
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.category}>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Select
                    id="category"
                    placeholder="Add a Category"
                    {...register("category", {
                      required: "This field is required",
                    })}
                  >
                    <option value="WORK">Work</option>
                    <option value="PERSONAL">Personal</option>
                    <option value="HOME">Home</option>
                  </Select>
                  <FormErrorMessage>
                    <FormErrorIcon />
                    This field is required
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleClose}>
                Close
              </Button>

              <Button
                bg="green.400"
                color="white"
                type="submit"
                isDisabled={!isValid}
                px="1.5rem"
                _hover={{
                  bg: "green.600",
                }}
              >
                Add Todo
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodForm;
