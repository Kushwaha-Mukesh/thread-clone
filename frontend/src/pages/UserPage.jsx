import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import useShowToast from "../hooks/useShowToast.js";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post.jsx";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
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

    const getPosts = async () => {
      setPostLoading(true);
      try {
        const res = await axios.get(`/api/post/user/${username}`);
        if (res.data.success) {
          setPosts(res.data.message);
        } else {
          showToast("Error", "error getting posts", "error");
        }
      } catch (error) {
        showToast("Error", error.response.data.message, "error");
      } finally {
        setPostLoading(false);
      }
    };

    getUser();
    getPosts();
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
      {!postLoading && posts.length === 0 && <h1>No Posts to show!😑</h1>}
      {postLoading && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size="xl" />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
