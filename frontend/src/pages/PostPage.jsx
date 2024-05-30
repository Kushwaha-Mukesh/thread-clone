import { Avatar, Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";
import Comment from "../components/Comments";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex flex={1} flexDirection={"column"} gap={2}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Flex w={"full"} alignItems={"center"} gap={1}>
            <Avatar src="/zuck-avatar.png" size={"md"} />
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} />
          </Flex>
          <Flex gap={4} alignItems={"center"}>
            <Text fontSize={"sm"} color={"gray.light"}>
              1d
            </Text>
            <BsThreeDots />
          </Flex>
        </Flex>
        <Text fontSize={"sm"}>This is my first post</Text>
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src="/post1.png" w={"full"} />
        </Box>
        <Actions liked={liked} setLiked={setLiked} />
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"} fontSize={"sm"}>
            203 Replies
          </Text>
          <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
          <Text color={"gray.light"} fontSize={"sm"}>
            1148 Likes
          </Text>
        </Flex>
      </Flex>
      <Divider my={4} />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </>
  );
};

export default PostPage;
