import { useState, useEffect, useCallback } from 'react';
import { get } from '../../utils/http';

interface Options {
	url: string;
	param: string;
}
const useQuery = <TResponse, TParam>({ url, param }: Options) => {
	const [data, setData] = useState<TResponse>();
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);

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
		get<TResponse, TParam>({ url, param: JSON.parse(param) })
			.then(handleSuccess)
			.catch(handleError);
	}, [url, param]);

	useEffect(() => {
		runQuery();
	}, [runQuery]);

	return { data, loading, error, refetch: runQuery };
};
export default useQuery;
