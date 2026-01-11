import { useState, useEffect } from "react";

export function useUser(userId) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
        setUserLoading(false);
      } catch (err) {
        setUserError(err.message || "Error fetching posts");
        setUserLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  return { user, userLoading, userError };
}
