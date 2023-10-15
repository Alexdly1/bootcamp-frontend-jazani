import axios, { type AxiosResponse } from 'axios';
import { type MeasureunitResponse } from '../domain';

export const findAll = async (): Promise<AxiosResponse<MeasureunitResponse[]>> =>
	await axios.get<MeasureunitResponse[]>('https://localhost:7214/api/measureunit');
