import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { Container, Table } from 'react-bootstrap';

import Spinner from '../../../components/UI/Spinner/Spinner';

import { getUsers } from '../../../services';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers({ setUsers, setFilteredUsers, setLoading });
    }, [])


    return (
        <Container>
            {
                loading ?
                    <div>
                        <Spinner />
                    </div> :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Nombre(s)</th>
                                <th>Apellido(s)</th>
                                <th>email</th>
                                <th>Estado</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(el => (
                                <tr key={el._id}>
                                    <td>{el._id}</td>
                                    <td>{el.type}</td>
                                    <td>{el.firstName}</td>
                                    <td>{el.lastName}</td>
                                    <td>{el.email}</td>
                                    <td>{el.status ? 'Activo' : 'Desactivado'}</td>
                                    <td><Link to={`/admin/users/${el._id}`}>Ver</Link></td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
            }
        </Container>
    )
}

export default Users
