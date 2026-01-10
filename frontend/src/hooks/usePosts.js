import { useState, useEffect } from "react";

export function usePosts() {
  const [postsList, setPostsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        const postsData = await response.json();
        setPostsList(postsData);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching posts");
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { postsList, loading, error };
}
