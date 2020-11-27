import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { login } from '../services/loginService';

export default function Login() {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    const onSubmit = async (data) => {
        try {
            const response = await login(data);
            if (response.status === 200) {
                localStorage.setItem('CTFAccount', JSON.stringify(response.data.Data));
                alert(`${response.data.Message}`);
                history.push('/profile');
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
            <h1 className="text-light">Login</h1>
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
        </div>
    );
}