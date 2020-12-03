import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Admin() {

    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('CTFAdminRole')) {
            history.push('/login');
            history.go(0);
        }
    }, []);

    return (
        <div className="container">
            <h1 className="text-light">Hello Admin</h1>
            <h2 className="text-light">Congrats for successfully landed at this page</h2>
            <p className="text-danger">Now we have one final quest for you</p>
        </div>
    );
}