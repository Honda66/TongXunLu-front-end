<template>
  <div>
    <h2>Contact List</h2>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search by name or phone" />
      <span class="search-tip">🔍</span> <!-- 简单的提示标识 -->
    </div>
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        {{ contact.name }} - {{ contact.phone }}
        <button @click="editContact(contact)">Edit</button>
        <button @click="deleteContact(contact.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contacts: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact => 
        contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        contact.phone.includes(this.searchQuery)
      );
    }
  },
  methods: {
    async fetchContacts() {
      const response = await axios.get('http://localhost:3333/api/contacts');
      this.contacts = response.data;
    },
    editContact(contact) {
      this.$emit('edit-contact', contact);
    },
    async deleteContact(id) {
      await axios.delete(`http://localhost:3333/api/contacts/${id}`);
      this.fetchContacts();
      this.$emit('contact-deleted');
    }
  },
  mounted() {
    this.fetchContacts();
  },
  watch: {
    searchQuery: {
      handler(newVal) {
        if (newVal === '') {
          this.fetchContacts();
        }
      }
    }
  }
};
</script>

<style scoped>
/* 添加一些基本样式 */
.search-container {
  position: relative;
  margin-bottom: 1rem;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-tip {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
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