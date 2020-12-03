import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { login } from '../services/loginService';

export default function Login() {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("CTFAccount") && JSON.parse(localStorage.getItem("CTFAccount")).role === "admin") {
            history.push('/admin');
        } else if (localStorage.getItem("CTFAccount")) {
            history.push("/profile");
        }
    }, []);

    const onSubmit = async (data) => {
        let groupNo = data.groupNumber;
        data.groupNumber = parseInt(groupNo);
        try {
            const response = await login(data);
            if (response.status === 200 && response.data.message === "proceed") {
                localStorage.setItem("CTFAccount", JSON.stringify({ "groupNumber": `${data.groupNumber}`, "role": "user" }));
                history.push('/profile');
            } else if (response.status === 250) {
                alert("Failed to login, please try again");
                history.go(0);
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="container-fluid">
            <h1 className="text-light">Normal User Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="text-light">Group Number</label>
                    <br/>
                    <select name="groupNumber" ref={register({required: { value: true, message: "Must choose your group number" }})}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                    {errors.groupNumber && errors.groupNumber.type === "required" && (
                        <div className="error text-danger">{errors.groupNumber.message}</div>
                    )}
                </div>
                <div className="form-group">
                    <label className="text-light">Password</label>
                    <br/>
                    <input name="loginPassword" type="password" ref={register({required: { value: true, message: "Must input password" }})} />
                    {errors.loginPassword && errors.loginPassword.type === "required" && (
                        <div className="error text-danger">{errors.loginPassword.message}</div>
                    )}
                </div>
                <input className="btn btn-primary" name="submit" type="submit" ref={register} value="Submit" />
            </form>
        </div>
    );
}