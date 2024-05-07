import { Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";
import { BsFillSunFill } from "react-icons/bs";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex w={"100%"} py={1} justifyContent={"flex-end"}>
        <IconButton
          size={"xs"}
          variant={"outline"}
          aria-label={colorMode == "light" ? "light" : "dark"}
          onClick={toggleColorMode}
          icon={colorMode != "light" ? <BsFillSunFill /> : <FaMoon />}
        />
      </Flex>
    </>
  );
}
