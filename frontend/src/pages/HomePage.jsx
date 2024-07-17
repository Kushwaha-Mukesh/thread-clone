import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast.js";
import axios from "axios";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post.jsx";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(() => {
    const getFeedPosts = async () => {
      try {
        const res = await axios.post("/api/post/postFeed");
        if (res.data.success) {
          setPosts(res.data.message);
        } else {
          showToast("Error", "Error loading feed", "error");
        }
      } catch (error) {
        showToast("Error", "Error loading feed", "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, []);
  return (
    <>
      {loading && (
        <Flex justify={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {!loading && posts.length === 0 && <h1>Follow users to see feeds.</h1>}

      {posts.length > 0 &&
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  );
};

export default HomePage;
