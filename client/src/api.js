import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export const loadUser = async () => {
  const res = await api.get('/auth');
  return res.data;
};

export const register = async formData => {
  const res = await api.post('/users', formData);
  return res.data;
};

export const login = async formData => {
  const res = await api.post('/auth', formData);
  return res.data;
};


export const getItems = async () => {
  const res = await api.get('/items');
  return res.data;
};
export const fetchItems = getItems; 

export const addItem = async (itemData) => {
  const res = await api.post('/items', itemData);
  return res.data;
};

export const deleteItem = async id => {
  const res = await api.delete(`/items/${id}`);
  return res.data;
};

export const updateItem = async (id, itemData) => {
  const res = await api.put(`/items/${id}`, itemData);
  return res.data;
};

export default api;