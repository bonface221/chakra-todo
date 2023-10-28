import { Box, Icon } from "@chakra-ui/react";

import { FaGithub } from "react-icons/fa";

const GithubCTA = () => {
  return (
    <a
      href="https://github.com/bonface221"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box position="fixed" right={10} bottom={14} zIndex={9999}>
        <Icon as={FaGithub} boxSize={16} bg="brand.white" borderRadius="md" />
      </Box>
    </a>
  );
};

export default GithubCTA;
