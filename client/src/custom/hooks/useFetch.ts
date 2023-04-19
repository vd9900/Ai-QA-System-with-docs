import axios from "axios";
import React, { useState } from "react";
import { Error, ResponseData, UseFetchResult } from "../../types";

export const useFetch = (): UseFetchResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ text?: string }>({});
  const [error, setError] = useState<Error | null>({
    isError: false,
    error: null,
  });
  const getData = async (url: string) => {
    setLoading(true);
    setError({
      isError: false,
      error: null,
    });
    try {
      const response = await axios.get<ResponseData>(url);
      setLoading(false);
      setData({ text: response.data.text as string });
      setError({
        isError: false,
        error: null,
      });
    } catch (err) {
      setLoading(false);
      setError({ isError: true, error: err as Error });
    }
  };

  return { loading, data, error, getData };
};
