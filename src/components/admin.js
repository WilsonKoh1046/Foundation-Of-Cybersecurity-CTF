import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { caesarGuess } from '../services/profileService'

export default function Admin() {

    const { register, handleSubmit } = useForm();
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('CTFAccount') || JSON.parse(localStorage.getItem('CTFAccount')).role !== "admin"){
            history.push('/login');
            history.go(0);
        }
    }, []);

    const onSubmit = async (data) => {
        data.groupNumber = JSON.parse(localStorage.getItem("CTFAccount")).groupNumber;
        try {   
            const response = await caesarGuess(data);
            if (response.status === 200) {
                alert(`Congrats, here's the flag: ${response.data.flag}`);
            } else if (response.status === 250) {
                alert("Please try again :)");
                console.log(response.data.cipher);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const discard = () => {
        if (localStorage.getItem("CTFAccount")) {
            localStorage.removeItem("CTFAccount");
            history.go(0);
        }
    }

    return (
        <div className="container">
            <h1 className="text-light">Hello Admin</h1>
            <h2 className="text-light">Congrats for successfully landed at this page</h2>
            <h3 className="text-danger">Now we have one final quest for you</h3>
            <br/>
            <h3 className="text-light">Get The Key To Our Flag</h3>
            <h3 className="text-light">Hint: You Need To Keep <i className="text-danger">Trying</i> :)</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <textarea style={{width: "500px", height: "300px"}} name="caeserText" ref={register} />
                </div>
                <input type="submit" className="btn btn-primary" ref={register} />
            </form>
            <br/>
            <button className="btn btn-danger" onClick={discard}>Back To Login</button> 
            <br/> 
            <i className="text-danger">** Warning: This will make all of your efforts so far become a waste! **</i>
        </div>
    );
}