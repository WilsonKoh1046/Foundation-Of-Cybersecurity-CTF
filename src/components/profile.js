import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { logout } from '../services/loginService';
import { editProfile } from '../services/profileService';

export default function Profile() {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const [username, setUsername] = useState('stranger');
    const [editProfile, setEditProfile] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('CTFAccount')) {
            setUsername(JSON.parse(localStorage.getItem('CTFAccount')).username);
        }
    }, [])

    const toggleEdit = () => {
        if (!editProfile) {
            setEditProfile(true);
        } else {
            setEditProfile(false);
        }
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    const signOut = () => {
        if (logout()) {
            history.push('/login');
        }
    }

    return (
        <div className="container-fluid">
            <h1 className="text-light">Hi, {username}</h1>
            <br/>
            <div>
                { editProfile && (
                    <div className="container-fluid">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label className="text-white">New Username</label>
                                <br/>
                                <input name="newUsername" defaultValue={username} ref={register} />
                            </div>
                            <div className="form-group">
                                <label className="text-white">New Password</label>
                                <br/>
                                <input name="newPassword" type="password" ref={register} />
                            </div>
                            <input type="submit" className="btn btn-primary" ref={register} />
                        </form>
                    </div>
                )}
                { !editProfile && (
                    <button className="btn btn-primary" onClick={toggleEdit}>Edit Profile</button>
                )}
            </div>
            <br/>
            <button className="btn btn-danger" onClick={signOut}>Log Out</button>
        </div>
    );
}