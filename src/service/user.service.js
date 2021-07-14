import axios from "axios";

import authHeader from "./auth-header";

const API_URL = '';

export const getSavedSongs = (usr) => {
    const data = { username: usr};
    return axios.get(API_URL + 'songs', { headers: authHeader(), params: data})
}

