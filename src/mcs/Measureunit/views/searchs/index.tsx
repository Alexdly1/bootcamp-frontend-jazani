import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import { MeasureunitRepository } from '../../infrastructure';
import { type MeasureunitResponse } from '../../domain';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/esm/Card';

const index = (): JSX.Element => {
	const [measureunit, measureunitSet] = useState<MeasureunitResponse[]>([]);

	useEffect(() => {
		void loadMeasureunit();
	}, []);

	const loadMeasureunit = async (): Promise<void> => {
		const response = await MeasureunitRepository.findAll();

		measureunitSet(response);
		console.log('response: ', response);
	};

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
									{measureunit.length > 0 &&
										measureunit.map(measureunit => (
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
