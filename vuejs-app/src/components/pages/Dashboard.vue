<template>
  <div class="alert alert-success" role="alert">
    {{ userStore.name }}
    <br>
    {{ userStore.email }}
    <br>
    Hello, {{ userStore.name }}! You are logged in.
    
    
    <button @click="handleSignout" class="border-0 bg-transparent p-0 ms-2" style="cursor: pointer;">
      <i class="fas fa-sign-out-alt text-danger"></i>
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import axios from 'axios';

const userStore = useUserStore();

const handleSignout = async () => {
  try {
    const token = localStorage.getItem('token');
    
    
    if (token) {
      await axios.post('http://localhost:8000/api/signout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  } catch (error) {
    console.error('Signout error:', error);
  } finally {
    
    localStorage.removeItem('token');
    if (userStore.logout) {
      userStore.logout(); 
    }

    try {
      
      const res = await axios.get(
        'http://localhost:8000/api/google/oauth/redirect?callback_url=http://localhost:5173/auth/callback'
      );
      
      
      window.location.href = res.data.redirect_url;
    } catch (err) {
      window.location.href = '/signin';
    }
  }
};
</script>