import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
  const [data, setData] = useState(() => {
    const cachedData = localStorage.getItem(url);
    return cachedData ? JSON.parse(cachedData) : null;
  });

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const response = await fetch(url, options);
          const json = await response.json();
          setData(json);
          localStorage.setItem(url, JSON.stringify(json));
        }
        catch (err) {
          (err);
        }
      };
      fetchData();
    }
  }, [url, options, data]);

  return { data };
};
