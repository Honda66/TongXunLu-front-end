<template>
  <div id="app">
    <header>
      <h1>Contact Book</h1>
    </header>
    <main>
      <AddContactForm @contact-added="fetchContacts" />
      <ContactList ref="contactList" @edit-contact="showEditForm" @contact-deleted="fetchContacts" />
      <EditContactForm v-if="editingContact" :contact="editingContact" @contact-updated="hideEditFormAndFetch" />
    </main>
  </div>
</template>

<script>
import AddContactForm from './components/AddContactForm.vue';
import ContactList from './components/ContactList.vue';
import EditContactForm from './components/EditContactForm.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    AddContactForm,
    ContactList,
    EditContactForm
  },
  data() {
    return {
      editingContact: null
    };
  },
  methods: {
    showEditForm(contact) {
      this.editingContact = contact;
    },
    hideEditFormAndFetch() {
      this.editingContact = null;
      this.fetchContacts();
    },
    async fetchContacts() {
      const response = await axios.get('http://localhost:3333/api/contacts');
      this.$refs.contactList.contacts = response.data; // 更新 ContactList 组件中的 contacts
    }
  },
  mounted() {
    this.fetchContacts();
  }
};
</script>

<style>
/* 添加一些基本样式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
}

header {
  background-color: #42b983;
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

main {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input, button {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  cursor: pointer;
  background-color: #42b983;
  color: white;
  border: none;
}

button:hover {
  background-color: #38a169;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background: #f9f9f9;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  margin-left: 0.5rem;
}
</style>