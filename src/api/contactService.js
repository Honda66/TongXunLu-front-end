// src/services/contactService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api', // 根据实际情况调整
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getContacts() {
    return apiClient.get('/contacts');
  },
  createContact(contact) {
    return apiClient.post('/contacts', contact);
  },
  updateContact(id, contact) {
    return apiClient.put(`/contacts/${id}`, contact);
  },
  deleteContact(id) {
    return apiClient.delete(`/contacts/${id}`);
  }
};