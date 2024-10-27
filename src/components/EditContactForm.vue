<template>
    <div v-if="contact">
      <h2>Edit Contact</h2>
      <form @submit.prevent="updateContact">
        <input type="text" v-model="localContact.name" placeholder="Name" required />
        <input type="text" v-model="localContact.phone" placeholder="Phone" required />
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['contact'],
    data() {
      return {
        localContact: { ...this.contact } // 复制 contact prop 到 localContact
      };
    },
    watch: {
      contact: {
        handler(newVal) {
          this.localContact = { ...newVal }; // 当 contact prop 变化时更新 localContact
        },
        deep: true
      }
    },
    methods: {
      async updateContact() {
        await axios.put(`http://localhost:3333/api/contacts/${this.localContact.id}`, this.localContact);
        this.$emit('contact-updated', this.localContact);
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