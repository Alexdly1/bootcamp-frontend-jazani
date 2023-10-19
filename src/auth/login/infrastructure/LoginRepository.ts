import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/core/constants/env';
import { type LoginRequest, type UserSecurityResponse } from '@/auth/login/domain';

export const login = async (payload: LoginRequest): Promise<UserSecurityResponse> => {
	const response: AxiosResponse<UserSecurityResponse> = await axios.post<UserSecurityResponse>(
		`${API_BASE_URL}/api/auth`,
		payload,
	);

	return response.data;
};
