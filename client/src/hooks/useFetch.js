import { useState, useEffect } from "react";

export function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        if (!ignore) setData(json);
      } catch (err) {
        if (!ignore) setError(err.message || "Error fetching data");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [url, options]);

  return { data, loading, error };
}
