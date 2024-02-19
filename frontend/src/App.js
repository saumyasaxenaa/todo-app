import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
const App = () => {
  return (
    <ChakraProvider>
      <Header />
    </ChakraProvider>
  );
};
export default App;
