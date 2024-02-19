import { createContext, useContext, useEffect, useState } from "react";
import { Input, InputGroup, Stack } from "@chakra-ui/react";

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
          <b>{todo.item}</b>
        ))}
      </Stack>
    </TodosContext.Provider>
  );
};
export default Todos;
