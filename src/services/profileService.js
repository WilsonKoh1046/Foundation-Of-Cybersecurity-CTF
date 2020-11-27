import axios from 'axios';

export const editProfile = async (data) => {
    try {
        const response = await axios.post('/edit', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}