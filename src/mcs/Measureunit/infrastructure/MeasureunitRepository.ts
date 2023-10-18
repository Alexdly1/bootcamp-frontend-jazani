import axios, { type AxiosResponse } from 'axios';
import { type MeasureunitResponse } from '../domain';

export const findAll = async (): Promise<MeasureunitResponse[]> => {
	// const response: MeasureunitResponse[] = await fetch('https://localhost:7214/api/measureunit')
	// 	.then(async res => await res.json())
	// 	.then((res: MeasureunitResponse[]) => res);

	// return response;

	const response: AxiosResponse<MeasureunitResponse[]> = await axios.get<MeasureunitResponse[]>(
		'https://localhost:7214/api/measureunit',
	);

	return response.data;
};
