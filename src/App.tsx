import {
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import TodoForm from "./components/todo-form";
import ThemeToggler from "./theme/theme-toggler";
import ListTodos from "./components/list-todo";
import { useState } from "react";
import CategoryMenu from "./components/category-menu";
import GithubCTA from "./components/github-cta";

export interface Todo {
  id: number;
  title: string;
  category: string;
  done: boolean;
}

function App() {
  const [current, setCurrrent] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
  };
  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const changeStatus = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const getAllTodos = () => {
    if (!!current && !!search) {
      return todos;
    } else {
      let filteredTodos = todos;
      if (current) {
        filteredTodos = todos.filter((todo) => todo.category === current);
      }

      if (search) {
        return filteredTodos.filter((todo) =>
          todo.title.toLowerCase().includes(search.toLowerCase())
        );
      }
      return filteredTodos;
    }
  };
  return (
    <>
      {" "}
      <Flex w="100vw" h="100vh" justify="center" overflowX="hidden">
        <Stack
          minW={{ base: "380px", sm: "400px" }}
          marginTop="2rem"
          p="2rem"
          h="fit-content"
          gap={8}
        >
          <Heading fontSize={{ base: "3xl", sm: "5xl" }} textAlign="center">
            Todo App
          </Heading>
          <Flex gap={3}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              bg={useColorModeValue("gray.200", "gray.700")}
            />
            <CategoryMenu current={current} setCurrent={setCurrrent} />
          </Flex>

          <TodoForm length={todos.length} addTodo={addTodo} />
          <ListTodos
            todos={getAllTodos()}
            deleteTodo={deleteTodo}
            changeStatus={changeStatus}
          />
        </Stack>{" "}
      </Flex>
      <ThemeToggler />
      <GithubCTA />
    </>
  );
}

export default App;
