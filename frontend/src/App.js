import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import Todos from "./components/Todos";
const App = () => {
  return (
    <ChakraProvider>
      <Header />
      <Todos />
    </ChakraProvider>
  );
};
export default App;
