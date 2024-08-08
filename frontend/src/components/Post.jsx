import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from "@chakra-ui/react";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

const Post = ({ post, postedBy, handleDeletePost }) => {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);

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
    <>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name={user && user.name}
            src={user && user.profilePicture}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user && user.username}`);
            }}
          />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
            {post.replies[0] && (
              <Avatar
                size={"sm"}
                name={post.replies[0].username}
                src={post.replies[0].userProfilePicture}
                position={"absolute"}
                top={"-12px"}
                left={"12px"}
                padding={2}
              />
            )}

            {post.replies[1] && (
              <Avatar
                size={"sm"}
                name={post.replies[1].username}
                src={post.replies[1].userProfilePicture}
                position={"absolute"}
                bottom={0}
                right={"-5px"}
                padding={2}
              />
            )}

            {post.replies[2] && (
              <Avatar
                size={"sm"}
                name={post.replies[2].username}
                src={post.replies[2].userProfilePicture}
                position={"absolute"}
                bottom={0}
                left={"6px"}
                padding={2}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user && user.username}`);
                }}
              >
                {user && user.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {currentUser?.user._id === user?._id && (
                <Menu>
                  <MenuButton>
                    <BsThreeDots size={18} cursor={"pointer"} />
                  </MenuButton>
                  <Portal>
                    <MenuList bg={"gray.dark"}>
                      <MenuItem
                        bg={"gray.dark"}
                        display={"flex"}
                        gap={2}
                        onClick={() => handleDeletePost(post._id)}
                      >
                        <MdDelete color="red" size={18} />
                        Delete
                      </MenuItem>
                      <MenuItem
                        bg={"gray.dark"}
                        display={"flex"}
                        gap={2}
                        onClick={() => handleDeletePost(post._id)}
                      >
                        <CiEdit color="blue" size={18} />
                        Edit
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              )}
            </Flex>
          </Flex>
          <Link to={`/${user && user.username}/post/${post._id}`}>
            <Text fontSize={"sm"}>{post.text}</Text>
            {post.image && (
              <Box
                borderRadius={6}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.light"}
                mt={4}
              >
                <Image src={post.image} w={"full"} />
              </Box>
            )}
          </Link>
          <Actions post={post} />
        </Flex>
      </Flex>
    </>
  );
};

export default Post;
