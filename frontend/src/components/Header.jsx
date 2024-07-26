import { Flex, Image, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  return (
    <Flex
      justifyContent={`${user ? "space-between" : "center"}`}
      mt={6}
      mb={12}
    >
      {user && (
        <RouterLink to="/">
          <AiFillHome size={24} />
        </RouterLink>
      )}

      <Image
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        cursor={"pointer"}
        w={6}
        alt="logo"
        onClick={toggleColorMode}
      />

      {user && (
        <RouterLink to={`${user.user.username}`}>
          <RxAvatar size={24} />
        </RouterLink>
      )}
    </Flex>
  );
};

export default Header;
