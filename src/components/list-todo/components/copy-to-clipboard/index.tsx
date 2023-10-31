import { Tag } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  title: string;
}

const CopyToClipboard = ({ title }: Props) => {
  const copyRef = useRef<HTMLDivElement>(null);

  function onCopy(title: string) {
    if (!copyRef.current) return;

    copyRef.current.textContent = "copied";

    setTimeout(() => {
      if (!copyRef.current) return;
      copyRef.current.textContent = "copy";
    }, 1000);
    navigator.clipboard.writeText(title);
  }
  return (
    <Tag
      size="sm"
      ref={copyRef}
      transition="all .3s ease-in-out"
      _hover={{
        cursor: "pointer",
        bg: "teal.400",
      }}
      onClick={() => onCopy(title)}
      bg="teal"
      h="fit-content"
    >
      copy
    </Tag>
  );
};

export default CopyToClipboard;
