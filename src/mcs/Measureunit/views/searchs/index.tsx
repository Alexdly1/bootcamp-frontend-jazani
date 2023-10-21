import { useState } from 'react';
import { type MeasureunitFilter, type MeasureunitResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/esm/Card';
import { type RequestPagination } from '@/shared/domain';
import usePaginatedSearchMeasureunit from '../../application/hooks/usePaginatedSearchMeasureunit';
import { TableSimple } from '@/core/components/table';
import { createColumnHelper } from '@tanstack/react-table';

const index = (): JSX.Element => {
	const [measureunitFilter, measureunitSet] = useState<RequestPagination<MeasureunitFilter>>({
		page: 2,
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

	return (
		<>
			<Row className="pt-2">
				<Col xs={12}>
					<Card>
						<Card.Header>Listado de Tipo de unidades de medida</Card.Header>
						<Card.Body>
							<TableSimple<MeasureunitResponse>
								columns={columns}
								data={measureunitPagineted?.data ?? []}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
