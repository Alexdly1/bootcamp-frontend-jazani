import { useState } from 'react';
import Table from 'react-bootstrap/Table';

import { type MeasureunitFilter, type MeasureunitResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/esm/Card';
import { type RequestPagination } from '@/shared/domain';
import usePaginatedSearchMeasureunit from '../../application/hooks/usePaginatedSearchMeasureunit';

const index = (): JSX.Element => {
	const [measureunitFilter, measureunitSet] = useState<RequestPagination<MeasureunitFilter>>({
		page: 2,
		perPage: 10,
	});

	// React Query
	const { data: measureunitPagineted, isFetching } =
		usePaginatedSearchMeasureunit(measureunitFilter);

	return (
		<>
			<Row className="pt-2">
				<Col xs={12}>
					<Card>
						<Card.Header>Listado de Tipo de unidades de medida</Card.Header>
						<Card.Body>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>#</th>
										<th>Nombre</th>
										<th>Descripcion</th>
										<th>Estado</th>
									</tr>
								</thead>
								<tbody>
									{measureunitPagineted?.data?.map(measureunit => (
										<tr key={measureunit.id}>
											<td>{measureunit.id}</td>
											<td>{measureunit.name}</td>
											<td>{measureunit.description}</td>
											<td>
												<Badge pill bg={measureunit.state ? 'success' : 'danger'}>
													{measureunit.state ? 'Activo' : 'Elminado'}
												</Badge>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
