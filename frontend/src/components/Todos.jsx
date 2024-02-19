import { createContext, useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";

const TodosContext = createContext({
  todos: [],
  fetchTodos: () => {},
});

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
      <Stack spacing={5} textAlign="center">
        {todos.map((todo) => (
          <b>{todo.item}</b>
        ))}
      </Stack>
    </TodosContext.Provider>
  );
};
export default Todos;
