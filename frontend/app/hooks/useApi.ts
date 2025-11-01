import { useCallback, useState } from "react";

export const useApi = <T, A extends unknown[]>(
	apiCall: (...args: A) => Promise<T>,
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const request = useCallback(
		async (...args: A) => {
			try {
				setLoading(true);
				const result = await apiCall(...args);
				setData(result);
				setError(null);
				return result;
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unknown error occurred",
				);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[apiCall],
	);

	return { data, loading, error, request };
};
