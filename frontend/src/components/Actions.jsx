import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaComment } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import axios from "axios";

const Actions = ({ post: post_ }) => {
  const user = useRecoilValue(userAtom);
  const [post, setPost] = useState(post_);
  const [isLiking, setIsLiking] = useState(false);
  const [reply, setReply] = useState("");

  const [liked, setLiked] = useState(
    post_ && post_.likes.includes(user && user.user._id)
  );

  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLikeAndUnlike = async () => {
    if (!user)
      return showToast(
        "Error",
        "You must be logged in to Like and Unlike a post",
        "error"
      );
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await axios.get(`/api/post/likePost/${post._id}`);
      if (res.data.success) {
        if (!liked) {
          setPost(res.data.post);
        } else {
          setPost(res.data.post);
        }
        setLiked(!liked);
        showToast("Success", res.data.message, "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLiking(false);
    }
  };

  const handleReply = async () => {
    if (!user)
      return showToast(
        "Error",
        "You must be logged in to Like and Unlike a post",
        "error"
      );
    try {
      const res = await axios.post(`/api/post/reply/${post._id}`, {
        text: reply,
      });
      if (res.data.success) {
        setPost(res.data.message);
        showToast("Success", "Reply added successfully", "success");
        setReply("");
        onClose();
      }
    } catch (error) {
      showToast("Error", "error adding reply", "error");
    }
  };

  return (
    <Flex flexDirection={"column"}>
      <Flex
        gap={3}
        my={2}
        onClick={(e) => e.preventDefault()}
        cursor={"pointer"}
      >
        {liked ? (
          <GoHeartFill color="rgb(237, 73, 86)" onClick={handleLikeAndUnlike} />
        ) : (
          <GoHeart onClick={handleLikeAndUnlike} />
        )}
        <FaComment onClick={onOpen} />
        <FaRepeat />
        <FiSend />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          {post && post.replies.length} Replies
        </Text>
        <Box w={1} h={1} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {post && post.likes.length} Likes
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post Your Reply</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                placeholder="Reply on the post"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" size={"sm"} mr={3} onClick={handleReply}>
              Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Actions;
