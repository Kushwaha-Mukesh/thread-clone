import { Link } from "react-router-dom";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
const UserPost = () => {
  return (
    <Link to={"/mark/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Mark Zuckerberg" src="/zuck-avatar.png" />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"sm"}
              name="mukesh"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={0}
              left={"15px"}
              padding={2}
            />
            <Avatar
              size={"sm"}
              name="mukesh"
              src="https://bit.ly/sage-adebayo"
              position={"absolute"}
              bottom={0}
              right={"-5px"}
              padding={2}
            />
            <Avatar
              size={"sm"}
              name="mukesh"
              src="https://bit.ly/prosper-baba"
              position={"absolute"}
              bottom={0}
              left={"4px"}
              padding={2}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                markzuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
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
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
