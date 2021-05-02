import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import { getUserById } from '../../../../services';

const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserById({ id, setUser, setLoading })
    }, [id])

    return (
        <div>
            {loading ?
                <Spinner /> :
                JSON.stringify(user)}
        </div>
    )
}

export default User
