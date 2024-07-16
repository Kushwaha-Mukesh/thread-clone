import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import useShowToast from "../hooks/useShowToast.js";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/profile/${username}`);
        if (res.data.success) {
          setUser(res.data.message);
        } else {
          showToast("Error", "error getting user", "error");
        }
      } catch (error) {
        showToast("Error", error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (!user && !loading) return <h1>User Not Found !</h1>;

  return (
    <>
      <UserHeader user={user} />
      <UserPost likes={401} replies={50} postImage={"/post1.png"} />
      <UserPost likes={32} replies={10} postImage={"/post2.png"} />
      <UserPost likes={921} replies={368} postImage={"/post3.png"} />
    </>
  );
};

export default UserPage;
