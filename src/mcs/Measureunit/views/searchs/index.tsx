import { useState } from 'react';
import { type MeasureunitFilter, type MeasureunitResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/esm/Card';
import { type FilterPage, type RequestPagination } from '@/shared/domain';
import usePaginatedSearchMeasureunit from '../../application/hooks/usePaginatedSearchMeasureunit';
import { TableSimple } from '@/core/components/table';
import { createColumnHelper } from '@tanstack/react-table';
import TablePaginated from '@/core/components/table/TablePaginated';

const index = (): JSX.Element => {
	const [measureunitFilter, measureunitSet] = useState<RequestPagination<MeasureunitFilter>>({
		page: 1,
		perPage: 10,
	});

	// React Query
	const { data: measureunitPagineted, isFetching } =
		usePaginatedSearchMeasureunit(measureunitFilter);

	// React Table
	const columnHelper = createColumnHelper<MeasureunitResponse>();

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('name', {
			header: 'Nombre',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('description', {
			header: 'Descripcion',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('registrationDate', {
			header: 'Fech. Registro',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('state', {
			header: 'Estado',
			cell: ({ row }) => (
				<div className="text-center">
					<Badge pill bg={row.original.state ? 'success' : 'danger'}>
						{row.original.state ? 'Activo' : 'Elminado'}
					</Badge>
				</div>
			),
		}),
	];

	// Methods
	const goToPage = (payload: FilterPage): void => {
		measureunitSet(prev => {
			return {
				...prev,
				page: payload.page,
				perPage: payload.perPage,
			};
		});
	};

	return (
		<>
			<Row className="pt-2">
				<Col xs={12}>
					<Card>
						<Card.Header>Listado de Tipo de unidades de medida</Card.Header>
						<Card.Body>
							<TablePaginated<MeasureunitResponse>
								columns={columns}
								data={measureunitPagineted}
								goToPage={goToPage}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
