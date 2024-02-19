import { Heading, Flex, Divider } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-around"
      wrap="wrap"
      padding="0.5rem"
      bg="blue.200"
    >
      <Flex align="center" mr={5}>
        <Heading as="h4" size="md">
          Todos
        </Heading>
        <Divider />
      </Flex>
    </Flex>
  );
};
export default Header;
