import {
  Badge,
  Button,
  Checkbox,
  Flex,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Todo } from "../../App";
import Swal from "sweetalert2";
import { useRef } from "react";

interface Props {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  changeStatus: (id: number) => void;
}

const ListTodos = ({ todos, deleteTodo, changeStatus }: Props) => {
  const copyRef = useRef<HTMLDivElement>(null);
  const color = useColorModeValue("gray.200", "gray.700");

  function onDeleteTodo(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      position: "top",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(id);
      }
    });
  }
  function onCopy(title: string) {
    if (!copyRef.current) return;

    copyRef.current.textContent = "copied";

    setTimeout(() => {
      if (!copyRef.current) return;
      copyRef.current.textContent = "copy";
    }, 1000);
    navigator.clipboard.writeText(title);
  }
  return (
    <Stack gap={6}>
      {todos.length > 0 ? (
        <>
          {todos.map((todo) => (
            <Flex
              borderRadius="md"
              key={todo.id}
              boxShadow="md"
              p="1rem .9rem"
              align="center"
              justify="space-between"
              bg={color}
            >
              <Stack align="start" gap={6}>
                <Flex align="center" gap={2}>
                  <Text fontSize="xl">{todo.title}</Text>
                  <Tag
                    size="sm"
                    ref={copyRef}
                    transition="all .3s ease-in-out"
                    _hover={{
                      cursor: "pointer",
                      bg: "teal.400",
                    }}
                    onClick={() => onCopy(todo.title)}
                    bg="teal"
                    h="fit-content"
                  >
                    copy
                  </Tag>
                </Flex>

                <Tag colorScheme="yellow">{todo.category}</Tag>
              </Stack>

              <Stack align="end" gap={6}>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  delete
                </Button>
                <Flex gap={2} align="center">
                  <Checkbox
                    defaultChecked={todo.done}
                    border={"green"}
                    colorScheme="green"
                    size="md"
                    onChange={() => changeStatus(todo.id)}
                  />
                  {todo.done ? (
                    <Badge colorScheme="green">Done</Badge>
                  ) : (
                    <Badge colorScheme="red">Not Done</Badge>
                  )}{" "}
                </Flex>
              </Stack>
            </Flex>
          ))}
        </>
      ) : (
        <Text fontSize="xl" align="center" fontWeight="bold">
          No Todos
        </Text>
      )}
    </Stack>
  );
};

export default ListTodos;
