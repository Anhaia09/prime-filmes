// Base da URL: https://api.themoviedb.org/3/
//URL da API: https://api.themoviedb.org/3/movie/now_playing?api_key=4347e84dcfba8e6f1ae2e133e4de613b&language=pt-BR


import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;