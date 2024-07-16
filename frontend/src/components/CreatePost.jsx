import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsImageFill } from "react-icons/bs";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const [remainingText, setRemainingText] = useState(500);
  const { handleImageChange, imageUrl, imageFile, setImageUrl, setImageFile } =
    usePreviewImg();
  const imageRef = useRef();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);

  const handleCreatePostChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 500) {
      setPostText(inputText);
      setRemainingText(500 - inputText.length);
    } else {
      const truncatedText = inputText.slice(0, 500);
      setPostText(truncatedText);
      setRemainingText(0);
    }
  };

  const handleCreatePost = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/post/create",
        { text: postText, postImg: imageFile },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        showToast("Success", "Post created successfully", "success");
      }
      setLoading(false);
      onClose();
      setPostText("");
      setImageUrl("");
      setImageFile(null);
      setRemainingText(500);
    } catch (error) {
      setLoading(false);
      showToast("Error", "Error creating post", "error");
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post Content goes here..."
                onChange={handleCreatePostChange}
                value={postText}
              ></Textarea>
              <Text
                fontSize={"x-small"}
                fontWeight={"bold"}
                textAlign={"right"}
                m={"1"}
                color={"gray.900"}
              >
                {remainingText}/500
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>
            {imageUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imageUrl} alt="selected img" />
                <CloseButton
                  onClick={() => {
                    setImageUrl(null);
                    setImageFile(null);
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
