import { type ResponsePagination, type RequestPagination } from '@/shared/domain';
import { type DefinedUseQueryResult, useQuery } from '@tanstack/react-query';
import { type MeasureunitResponse, type MeasureunitFilter } from '../../domain';
import { PAGINATED_SEARCH } from './QueryKeys';
import { MeasureunitRepository } from '../../infrastructure';

const usePaginatedSearchMeasureunit = (
	searchFilter: RequestPagination<MeasureunitFilter>,
): DefinedUseQueryResult<ResponsePagination<MeasureunitResponse>, Error> => {
	return useQuery({
		queryKey: [PAGINATED_SEARCH, searchFilter],
		queryFn: async () => await MeasureunitRepository.paginatedSearch(searchFilter),
		retry: 0,
		refetchOnWindowFocus: false,
		initialData: {
			from: 0,
			to: 0,
			perPage: 0,
			currentPage: 0,
			lastPage: 0,
			total: 0,
			data: [],
		},
	});
};

export default usePaginatedSearchMeasureunit;
