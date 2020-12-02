import axios from 'axios';

export const login = async (data) => {
    try {
        const response = await axios.post('/login', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const logout = () => {
    if (localStorage.getItem('CTFAccount')) {
        localStorage.removeItem('CTFAccount');
        return true;
    }
    return false;
}

export const verifyToken = async (token) => {
    try {
        const response = await axios.post('/verify-token', {"token": token});
        return response;
    } catch(err) {
        console.log(err);
    }
}