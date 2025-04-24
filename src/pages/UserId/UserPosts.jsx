import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../services/api";

const UserPosts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts(id);
        console.log("UserPosts", data);
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, [id]);
  return <div>UserPosts</div>;
};

export default UserPosts;
