import { type ResponsePagination, type RequestPagination } from '@/shared/domain';
import { DefinedUseQueryResult, type UseQueryResult, useQuery } from '@tanstack/react-query';
import { type MeasureunitResponse, type MeasureunitFilter } from '../../domain';
import { PAGINATED_SEARCH } from './QueryKeys';
import { MeasureunitRepository } from '../../infrastructure';

const usePaginatedSearchMeasureunit = (
	searchFilter: RequestPagination<MeasureunitFilter>,
): UseQueryResult<ResponsePagination<MeasureunitResponse>, Error> => {
	return useQuery({
		queryKey: [PAGINATED_SEARCH, searchFilter],
		queryFn: async () => await MeasureunitRepository.paginatedSearch(searchFilter),
		retry: 0,
		refetchOnWindowFocus: false,
	});
};

export default usePaginatedSearchMeasureunit;
