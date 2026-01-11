import { useState, useEffect } from "react";

export function usePosts() {
  const [postsList, setPostsList] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const postsData = await response.json();
        setPostsList(postsData);
        setPostsLoading(false);
      } catch (err) {
        setPostsError(err.message || "Error fetching posts");
        setPostsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { postsList, postsLoading, postsError };
}
