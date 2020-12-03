import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { logout } from '../services/loginService';
import { editUserProfile } from '../services/profileService';

export default function Profile() {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const [groupNumber, setGroupNumber] = useState(0);
    const [editProfile, setEditProfile] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("CTFAccount") && JSON.parse(localStorage.getItem("CTFAccount")).role === "admin") {
            history.push('/admin');
        } 
        if (localStorage.getItem('CTFAccount')) {
            setGroupNumber(JSON.parse(localStorage.getItem('CTFAccount')).groupNumber);
        } else {
            history.push('/login');
            history.go(0);
        }
    }, [])

    const toggleEdit = () => {
        if (!editProfile) {
            setEditProfile(true);
        } else {
            setEditProfile(false);
        }
    }

    const onSubmit = async (data) => {
        data.groupNumber = parseInt(groupNumber);
        try {
            const response = await editUserProfile(data);
            if (response.status === 200 && response.data.message === "proceed") {
                let currentAcc = JSON.parse(localStorage.getItem("CTFAccount"));
                currentAcc.role = response.data.role;
                localStorage.setItem("CTFAccount", JSON.stringify(currentAcc));
                history.push('/admin');
            } else {
                alert("Wrong admin password, please try again");
                console.log("This cipher looks useful....     " + response.data.cipher);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const signOut = () => {
        if (logout()) {
            history.push('/login');
        }
    }

    return (
        <div className="container-fluid">
            <h1 className="text-light">Hi, Group {groupNumber}</h1>
            <br/>
            <div>
                { editProfile && (
                    <div className="container-fluid">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label className="text-white">Please Enter the Admin Password</label>
                                <br/>
                                <input name="adminPassword" type="password" ref={register} />
                                <br/>
                                <i className="text-danger">Hint: Remember what you typed here...</i>
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