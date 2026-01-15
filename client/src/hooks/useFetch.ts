import { useState, useEffect } from "react";

export function useFetch<T = unknown>(url: string | undefined) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        if (!url) {
          return;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        if (!ignore) setData(json);
      } catch (err) {
        let message = "Error fetching data";
        if (err instanceof Error) message = err.message;
        if (!ignore) setError(message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}
