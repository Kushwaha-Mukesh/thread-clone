import { Link } from "react-router-dom";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
const Post = ({ post, postedBy }) => {
  const [liked, setLiked] = useState(false);
  const showToast = useShowToast();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/profile/${postedBy}`);
        if (res.data.success) {
          setUser(res.data.message);
        }
      } catch (error) {
        showToast("Error", "error getting user", "error");
      }
    };
    getUser();
  }, [postedBy]);

  return (
    <Link to={"/mark/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name={user && user.name}
            src={user && user.profilePicture}
          />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"sm"}
              name="mukesh"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"-12px"}
              left={"12px"}
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
              left={"6px"}
              padding={2}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                {user && user.username}
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
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.image && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.image} w={"full"} />
            </Box>
          )}
          <Actions liked={liked} setLiked={setLiked} />
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {post.replies.length} Replies
            </Text>
            <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {post.likes.length} Likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
