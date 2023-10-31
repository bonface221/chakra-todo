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
import CopyToClipboard from "./components/copy-to-clipboard";

interface Props {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  changeStatus: (id: number) => void;
}

const ListTodos = ({ todos, deleteTodo, changeStatus }: Props) => {
  const color = useColorModeValue("gray.200", "gray.700");

  function onDeleteTodo(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      width: "25em",
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
                  <CopyToClipboard title={todo.title} />
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
