import { Flex } from "@chakra-ui/react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaComment } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

const Actions = ({ liked, setLiked }) => {
  return (
    <Flex gap={3} my={2} onClick={(e) => e.preventDefault()} cursor={"pointer"}>
      {liked ? (
        <GoHeartFill
          color="rgb(237, 73, 86)"
          onClick={() => setLiked(!liked)}
        />
      ) : (
        <GoHeart onClick={() => setLiked(!liked)} />
      )}
      <FaComment />
      <FaRepeat />
      <FiSend />
    </Flex>
  );
};

export default Actions;
