import { createContext, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const TodosContext = createContext({
  todos: [],
  fetchTodos: () => {},
});

const AddTodo = () => {
  const [item, setItem] = useState("");
  const { todos, fetchTodos } = useContext(TodosContext);

  const handleInput = (event) => {
    setItem(event.target.value);
  };

  const handleSubmit = (event) => {
    const newTodo = {
      id: todos.length + 1,
      item: item,
    };
    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    }).then(fetchTodos);
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Add a todo item"
          aria-label="Add a todo item"
          onChange={handleInput}
        />
      </InputGroup>
    </form>
  );
};

const UpdateTodo = ({ item, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todo, setTodo] = useState(item);
  const { fetchTodos } = useContext(TodosContext);

  const updateTodo = async () => {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: todo }),
    });
    onClose();
    await fetchTodos();
  };
  return (
    <>
      <Button h="1.5rem" size="sm" onClick={onOpen}>
        Update Todo
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Add a todo item"
                aria-label="Add a todo item"
                value={todo}
                onChange={(event) => setTodo(event.target.value)}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button h="1.5rem" size="sm" onClick={updateTodo}>
              Update Todo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const DeleteTodo = ({ id }) => {
  const { fetchTodos } = useContext(TodosContext);
  const deleteTodo = async () => {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: { id: id },
    });
    await fetchTodos();
  };
  return (
    <Button h="1.5rem" size="sm" onClick={deleteTodo}>
      Delete Todo
    </Button>
  );
};

const TodoHelper = ({ item, id, fetchTodos }) => {
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-around">
        <Text mt={4} as="div">
          {item}
          <Flex align="end">
            <UpdateTodo item={item} id={id} fetchTodos={fetchTodos} />
            <DeleteTodo id={id} fetchTodos={fetchTodos} />
          </Flex>
        </Text>
      </Flex>
    </Box>
  );
};

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todos");
    const todos = await response.json();
    setTodos(todos.data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <TodosContext.Provider value={{ todos, fetchTodos }}>
      <AddTodo />
      <Stack spacing={5} textAlign="center">
        {todos.map((todo) => (
          <TodoHelper item={todo.item} id={todo.id} fetchTodos={fetchTodos} />
        ))}
      </Stack>
    </TodosContext.Provider>
  );
};
export default Todos;
