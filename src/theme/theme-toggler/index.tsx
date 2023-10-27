import { Flex, Icon, useColorMode } from "@chakra-ui/react";
import { MdOutlineNightlightRound } from "react-icons/md";
import { BsSunFill } from "react-icons/bs";

const ThemeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon =
    colorMode === "light" ? (
      <Icon
        as={MdOutlineNightlightRound}
        boxSize={7}
        transform="rotate(-30deg)"
      />
    ) : (
      <Icon as={BsSunFill} color="white" boxSize={7} />
    );
  return (
    <Flex
      align="center"
      justify="center"
      position="fixed"
      boxSize={12}
      right={5}
      top={4}
      onClick={toggleColorMode}
      bg={colorMode === "light" ? "gray.200" : "gray.700"}
      borderRadius="full"
    >
      {icon}
    </Flex>
  );
};

export default ThemeToggler;
