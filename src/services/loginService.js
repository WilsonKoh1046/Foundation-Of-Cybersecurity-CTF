import axios from 'axios';

export const login = async (data) => {
    try {
        const response = await axios.post('/test/login', data);
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
