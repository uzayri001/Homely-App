import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";


interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams: P) => Promise<void>;
}

// Custom React hook for managing Appwrite API calls with state and error handling
// want the function to work for all API calls using generic type declarations T,P
export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn, // async function to fetch data
  params = {} as P, // default fetch params
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {

    // define state variables to track loading, error, and data
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

    // define a fetch function to update data with new params
  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  const refetch = async (newParams: P) => await fetchData(newParams);

  return { data, loading, error, refetch };
};