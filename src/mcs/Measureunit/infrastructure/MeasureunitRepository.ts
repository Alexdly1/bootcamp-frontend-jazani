import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import { stringify } from 'qs';
import { type MeasureunitFilter, type MeasureunitResponse } from '../domain';
import { type ResponsePagination, type RequestPagination } from '@/shared/domain';

export const findAll = async (): Promise<MeasureunitResponse[]> => {
	// const response: MeasureunitResponse[] = await fetch('https://localhost:7214/api/measureunit')
	// 	.then(async res => await res.json())
	// 	.then((res: MeasureunitResponse[]) => res);

	// return response;

	const response: AxiosResponse<MeasureunitResponse[]> = await axios.get<MeasureunitResponse[]>(
		`${API_BASE_URL}/api/measureunit`,
	);
	return response.data;
};

export const paginatedSearch = async (
	payload: RequestPagination<MeasureunitFilter>,
): Promise<ResponsePagination<MeasureunitResponse>> => {
	const queryParams: string = stringify(payload, { allowDots: true });

	const response: AxiosResponse<ResponsePagination<MeasureunitResponse>> = await axios.get<
		ResponsePagination<MeasureunitResponse>
	>(`${API_BASE_URL}/api/measureunit/paginatedsearch?${queryParams}`);

	return response.data;
};
