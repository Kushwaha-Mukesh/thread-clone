import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";

const UpdateProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const fileRef = useRef();
  const { handleImageChange, imageUrl, imageFile } = usePreviewImg();
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);

  const [updateDetails, setUpdateDetails] = useState({
    name: user.user.name,
    username: user.user.username,
    email: user.user.email,
    bio: user.user.bio,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;
    setUpdating(true);
    try {
      const res = await axios.put(
        `api/user/update/${user.user._id}`,
        {
          ...updateDetails,
          profilePicture: imageFile,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        localStorage.setItem("thread-user", JSON.stringify(res.data));
        setUser(res.data);
        showToast("Success", res.data.message, "success");
      } else {
        showToast("Error", res.data.message, "error");
      }
    } catch (error) {
      showToast("Error", error.response.data.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Flex align={"center"} justify={"center"} my={6}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading
            align={"center"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
          >
            Edit Profile
          </Heading>
          <FormControl id="userName">
            <Stack
              direction={["column", "row"]}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={6}
            >
              <Center>
                <Avatar
                  size="xl"
                  boxShadow={"md"}
                  cursor={"pointer"}
                  src={imageUrl || user.user.profilePicture}
                  onClick={() => fileRef.current.click()}
                />
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="mkushwaha016"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={updateDetails.username}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, username: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Mukesh Kushwaha"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={updateDetails.name}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={updateDetails.email}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              value={updateDetails.password}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, password: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="describe your self"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={updateDetails.bio}
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, bio: e.target.value })
              }
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
              isLoading={updating}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default UpdateProfile;
