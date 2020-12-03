import axios from 'axios';

export const editUserProfile = async (data) => {
    try {
        const response = await axios.post('/test/xor', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const caesarGuess = async (data) => {
    try {
        const response = await axios.post('/test/caesar', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}