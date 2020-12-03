import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { login, verifyToken } from '../services/loginService';

export default function Login() {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("CTFAdminRole")) {
            (async () => {
                try {
                    const response = await verifyToken(localStorage.getItem("CTFAdminRole"));
                    if (response.status === 200 && response.data.Message === "verified") {
                        setIsAdmin(true);
                    }
                } catch(err) {
                    console.log(err);
                }
            })();
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            if (!isAdmin) {
                const response = await login(data);
                if (response.status === 200) {
                    localStorage.setItem('CTFAccount', JSON.stringify(response.data.Data));
                    alert(`${response.data.Message}`);
                    history.push('/profile');
                }
            } else {
                alert("success");
                history.push('/admin');
            }
        } catch(err) {
            console.log(err);
            alert("Failed to login");
            history.go(0);
            return;
        }
    }

    return (
        <div className="container-fluid">
            { isAdmin ?
                <>
                <h1 className="text-light">Admin User Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="text-light">Username</label>
                        <br/>
                        <input name="username" ref={register({required: { value: true, message: "Must input username" }})} />
                        {errors.username && errors.username.type === "required" && (
                            <div className="error text-danger">{errors.username.message}</div>
                        )}
                    </div>
                    <div className="form-group">
                    <label className="text-light">Password</label>
                    <br/>
                    <input name="password" type="password" ref={register({required: { value: true, message: "Must input password" }})} />
                    {errors.password && errors.password.type === "required" && (
                    <div className="error text-danger">{errors.password.message}</div>
                    )}
                </div>
                <input className="btn btn-primary" type="submit" ref={register} value="Submit" />
                </form>
                </>
                :
                <>
                <h1 className="text-light">Normal UserLogin</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="text-light">Username</label>
                        <br/>
                        <input name="username" ref={register({required: { value: true, message: "Must input username" }})} />
                        {errors.username && errors.username.type === "required" && (
                            <div className="error text-danger">{errors.username.message}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <br/>
                        <input name="password" type="password" ref={register({required: { value: true, message: "Must input password" }})} />
                        {errors.password && errors.password.type === "required" && (
                            <div className="error text-danger">{errors.password.message}</div>
                        )}
                    </div>
                    <input className="btn btn-primary" type="submit" ref={register} value="Submit" />
                </form>
                </>
            }
        </div>
    );
}