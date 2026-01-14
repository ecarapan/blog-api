import { useState, useEffect } from "react";

export function useFetch<T = any>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, [url, options]);

  return { data, loading, error };
}
