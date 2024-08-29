"use client";

import { useState, useReducer, useEffect } from "react";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | null;
}

async function SuperFetch<T>(
  url: string,
  method: string = "GET",
  headers: Record<string, string> = {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: BodyInit | null = null
): Promise<T> {
  const options: FetchOptions = { method, headers };
  if (method === "POST" || method === "PUT") {
    options.body = body;
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

interface DataFetchState<T> {
  loading: boolean;
  error: boolean;
  data: T[];
  total: T[];
  limit: number;
}

type DataFetchAction<T> =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: T[] }
  | { type: "FETCH_FAILURE" }
  | { type: "LOAD_MORE" };

function dataFetchReducer<T>(
  state: DataFetchState<T>,
  action: DataFetchAction<T>
): DataFetchState<T> {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload.slice(0, state.limit),
        total: action.payload,
        loading: false,
        error: false,
      };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: true };
    case "LOAD_MORE":
      return {
        ...state,
        data: [
          ...state.data,
          ...state.total.slice(
            state.data.length,
            state.data.length + state.limit
          ),
        ],
        loading: false,
        error: false,
      };
    default:
      throw new Error("Unhandled action type");
  }
}

const useDataApi = <T>(
  initialUrl: string,
  limit: number = 10,
  initialData: T[] = []
) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: initialData,
    total: initialData,
    limit: limit,
  } as DataFetchState<T>);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await SuperFetch<T[]>(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  const loadMoreData = () => {
    dispatch({ type: "LOAD_MORE" });
  };

  const doFetch = (url: string) => {
    setUrl(url);
  };

  return { ...state, doFetch, loadMoreData };
};

export default useDataApi;
