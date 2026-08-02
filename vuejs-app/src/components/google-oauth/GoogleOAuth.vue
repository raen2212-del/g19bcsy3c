<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>hi</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  const error = route.query.error;
  if (error === 'google_oauth_failed') {
    window.location.href = '/'; // ទៅកាន់ទំព័រ Signin វិញ
    return;
  }

  const token = route.query.token;
  if (!token) {
    window.location.href = '/'; // ទៅកាន់ទំព័រ Signin វិញ
    return;
  }

  // ១. រក្សាទុក Token ចូលក្នុង localStorage ផ្ទាល់
  localStorage.setItem('SANCTUM-TOKEN', token);

  // ២. บังคับផ្លាស់ប្តូរទំព័រទៅកាន់ Dashboard ភ្លាមៗ (Refresh Browser តែម្តង)
  window.location.href = '/dashboard';
});
</script>