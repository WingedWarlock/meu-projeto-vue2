import axios from 'axios';

const API_URL = 'http://localhost:3000/api/comentarios';

export default {
  listar() {
    return axios.get(API_URL);
  },
  adicionar(comentario) {
    return axios.post(API_URL, comentario);
  },
  excluir(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};