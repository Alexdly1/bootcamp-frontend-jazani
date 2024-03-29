import { type FilterPage, type ResponsePagination } from '@/shared/domain';
import { useState, type JSX, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import FormSelect from 'react-bootstrap/FormSelect';

interface PaginationLinksProps<T> {
	data: ResponsePagination<T>;
	goToPage: (payload: FilterPage) => void;
}

const PaginationLinks = <T,>({ data, goToPage }: PaginationLinksProps<T>): JSX.Element => {
	// Attributes
	const perPageItems: number[] = [5, 10, 20, 30, 40, 50, 100];
	const paginationItemsLimit: number = 6;

	const [pageSize, setPageSize] = useState<number>(0);
	const [pageOptios, setPageOptions] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);

	const [paginationItems, setPaginationItems] = useState<number[]>([]);
	const [isPosibleShowAll, setIsPosibleShowAll] = useState<boolean>(true);
	const [separatorAtEnd, setSeparatoAtEnd] = useState<boolean>(false);
	const [separatorAtAround, setSeparatoAtAround] = useState<boolean>(false);

	// Hooks
	useEffect(() => {
		setPaginationItems(Array.from({ length: paginationItemsLimit }, (x, i) => i));
	}, []);

	useEffect(() => {
		if (data !== null) {
			setCurrentPage(data.currentPage);
			setPageSize(data.perPage);
			setPageOptions(Array.from({ length: data.lastPage }, (x, i) => i));

			setSeparatoAtEnd(data.currentPage < paginationItemsLimit);

			const showSeparatorAtAround =
				data.currentPage >= paginationItemsLimit &&
				data.lastPage > paginationItemsLimit &&
				data.lastPage > data.currentPage + 1;

			setSeparatoAtAround(showSeparatorAtAround);
		}
	}, [data]);

	useEffect(() => {
		if (data?.lastPage != null) setIsPosibleShowAll(data.lastPage <= paginationItemsLimit);
	}, [data?.lastPage]);

	// Methods
	const isCurrentPage = (current: number | undefined): boolean => current === currentPage;

	const PaginationItems = (): JSX.Element => {
		let content: JSX.Element;

		if (isPosibleShowAll) {
			content = (
				<>
					{pageOptios.map(pageNumber => (
						<Pagination.Item
							key={pageNumber}
							active={isCurrentPage(pageNumber + 1)}
							onClick={() => {
								goToPage({ page: pageNumber + 1, perPage: pageSize });
							}}
						>
							{pageNumber + 1}
						</Pagination.Item>
					))}
				</>
			);
		} else if (separatorAtEnd) {
			content = (
				<>
					{paginationItems.map(pageNumber => {
						return (
							<Pagination.Item
								key={pageNumber}
								active={isCurrentPage(pageNumber + 1)}
								onClick={() => {
									goToPage({ page: pageNumber + 1, perPage: pageSize });
								}}
							>
								{pageNumber + 1}
							</Pagination.Item>
						);
					})}

					<Pagination.Ellipsis />
					<Pagination.Item
						active={isCurrentPage(data?.lastPage)}
						onClick={() => {
							goToPage({ page: data?.lastPage, perPage: pageSize });
						}}
					>
						{data?.lastPage ?? 0}
					</Pagination.Item>
				</>
			);
		} else if (separatorAtAround) {
			content = (
				<>
					<Pagination.Item
						active={isCurrentPage(1)}
						onClick={() => {
							goToPage({ page: 1, perPage: pageSize });
						}}
					>
						1
					</Pagination.Item>
					<Pagination.Ellipsis />

					<Pagination.Item
						active={isCurrentPage((data?.currentPage ?? 0) - 1)}
						onClick={() => {
							goToPage({ page: (data?.currentPage ?? 0) - 1, perPage: pageSize });
						}}
					>
						{(data?.currentPage ?? 0) - 1}
					</Pagination.Item>
					<Pagination.Item
						active={isCurrentPage(data?.currentPage ?? 0)}
						onClick={() => {
							goToPage({ page: data?.currentPage, perPage: pageSize });
						}}
					>
						{data?.currentPage ?? 0}
					</Pagination.Item>
					<Pagination.Item
						active={isCurrentPage((data?.currentPage ?? 0) + 1)}
						onClick={() => {
							goToPage({ page: (data?.currentPage ?? 0) + 1, perPage: pageSize });
						}}
					>
						{(data?.currentPage ?? 0) + 1}
					</Pagination.Item>

					<Pagination.Ellipsis />
					<Pagination.Item
						active={isCurrentPage(data?.lastPage)}
						onClick={() => {
							goToPage({ page: data?.lastPage, perPage: pageSize });
						}}
					>
						{data?.lastPage ?? 0}
					</Pagination.Item>
				</>
			);
		} else {
			content = (
				<>
					<Pagination.Item
						active={isCurrentPage(1)}
						onClick={() => {
							goToPage({ page: 1, perPage: pageSize });
						}}
					>
						1
					</Pagination.Item>
					<Pagination.Ellipsis />
					{paginationItems.map(pageNumber => {
						const current = (data?.lastPage ?? 0) - (paginationItemsLimit + pageNumber) + 1;
						return (
							<Pagination.Item
								key={pageNumber}
								active={isCurrentPage(current)}
								onClick={() => {
									goToPage({ page: current, perPage: pageSize });
								}}
							>
								{current}
							</Pagination.Item>
						);
					})}
				</>
			);
		}

		return content;
	};

	return (
		<div className="d-flex justify-content-between align-items-center flex-wrap">
			<div className="d-flex justify-content-between align-items-center py-1">
				<div className="pe-2">
					Mostrando del
					<span className="fw-bold"> {data.from}</span> al
					<span className="fw-bold"> {data.to}</span> de un total de
					<span className="fw-bold"> {data.total}</span> registros
				</div>
				<FormSelect
					size="sm"
					className="w-auto"
					value={pageSize}
					onChange={e => {
						const perPage = Number(e.target.value);

						setPageSize(perPage);
						goToPage({ page: 1, perPage });
					}}
				>
					{perPageItems.map(pageSizeItem => (
						<option key={pageSizeItem} value={pageSizeItem}>
							{pageSizeItem}
						</option>
					))}
				</FormSelect>
			</div>
			<Pagination size="sm">
				<Pagination.First
					disabled={data.currentPage === 1}
					onClick={() => {
						goToPage({ page: 1, perPage: pageSize });
					}}
				/>
				<Pagination.Prev
					disabled={data.currentPage === 1}
					onClick={() => {
						goToPage({ page: (data.currentPage ?? 0) - 1, perPage: pageSize });
					}}
				/>
				<PaginationItems />
				<Pagination.Next
					disabled={data.currentPage === data.lastPage}
					onClick={() => {
						goToPage({ page: data.currentPage + 1, perPage: pageSize });
					}}
				/>
				<Pagination.Last
					disabled={data.currentPage === data.lastPage}
					onClick={() => {
						goToPage({ page: data.lastPage, perPage: pageSize });
					}}
				/>
			</Pagination>
		</div>
	);
};

export default PaginationLinks;
