import { useCallback, useEffect, useState } from 'react';

import { get } from '@/utils/http';

interface Options {
  token?: string | undefined;
  url: string;
  param?: object;
}
const useQuery = <TResponse, TParam = {}>({ token, url, param }: Options) => {
  const [data, setData] = useState<TResponse>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  // make object primitive
  // to prevent dependency array
  // from detecting identical(same key & value) object as different
  const stringifiedParam = param ? JSON.stringify(param) : '';

  const handleError = (error: any) => {
    setError(error.response?.data.err);
    setLoading(false);
  };

  const runQuery = useCallback(() => {
    const handleSuccess = (data: TResponse | undefined) => {
      setData(data);
      setLoading(false);
    };

    setLoading(true);
    get<TResponse, TParam>({
      token,
      url,
      ...(stringifiedParam && { param: JSON.parse(stringifiedParam) }),
    })
      .then(handleSuccess)
      .catch(handleError);
  }, [token, url, stringifiedParam]);

  useEffect(() => {
    runQuery();
  }, [runQuery]);

  return { data, loading, error, refetch: runQuery };
};
export default useQuery;
