import axios from "axios";

const API_URL = 'https:://';

export const register = (usrname, pwd, name) => {
    return axios.post(API_URL + 'signup', {
        usrname,
        pwd,
        name,
    });
};

export const login = (usrname, pwd) => {
    return axios.post(API_URL + 'login', {
        usrname,
        pwd,
    }).then((response) =>{
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    });
};

export const logout = () => {
    localStorage.removeItem('user');
}

export const getCurUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
