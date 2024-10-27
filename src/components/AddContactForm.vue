<template>
    <div>
      <h2>Add Contact</h2>
      <form @submit.prevent="addContact">
        <input type="text" v-model="name" placeholder="Name" required />
        <input type="text" v-model="phone" placeholder="Phone" required />
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        phone: ''
      };
    },
    methods: {
      async addContact() {
        const response = await axios.post('http://localhost:3333/api/contacts', {
          name: this.name,
          phone: this.phone
        });
        this.$emit('contact-added', response.data);
        this.name = '';
        this.phone = '';
      }
    }
  };
  </script>
  
  <style scoped>
  /* 添加一些基本样式 */
  form {
    display: flex;
    flex-direction: column;
  }
  
  input, button {
    margin: 0.5rem 0;
  }
  </style>