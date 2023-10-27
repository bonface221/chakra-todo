import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";

interface Props {
  current: string;
  setCurrent: (category: string) => void;
}

const CategoryMenu = ({ current, setCurrent }: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<MdArrowDropDown />}>
        {current?.length > 0 ? current : "Category"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setCurrent("")}>All</MenuItem>
        <MenuItem onClick={() => setCurrent("HOME")}>Home</MenuItem>
        <MenuItem onClick={() => setCurrent("WORK")}>Work</MenuItem>
        <MenuItem onClick={() => setCurrent("PERSONAL")}>Personal</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CategoryMenu;
