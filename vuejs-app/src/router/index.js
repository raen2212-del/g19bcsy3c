import ResetPassword from '@/components/auth/ResetPassword.vue';
import SetNewPassword from '@/components/auth/SetNewPassword.vue';
import Signin from '@/components/auth/Signin.vue';
import Signout from '@/components/auth/Signout.vue';
import Signup from '@/components/auth/Signup.vue';
import VerifyEmail from '@/components/auth/VerifyEmail.vue';
import GoogleOAuth from '@/components/google-oauth/GoogleOAuth.vue';
import Dashboard from '@/components/pages/Dashboard.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth.signin',
      component: Signin,
      meta: { guarded: false },
    },
    {
      path: '/signout',
      name: 'auth.signout',
      component: Signout,
    },
    {
      path: '/signup',
      name: 'auth.signup',
      component: Signup,
      meta: { guarded: false },
    },
    {
      path: '/verify/email',
      name: 'auth.verify.email',
      component: VerifyEmail,
      meta: { guarded: false },
    },
    {
      path: '/reset-password',
      name: 'auth.reset-password',
      component: ResetPassword,
      meta: { guarded: false },
    },
    {
      path: '/set-new-password',
      name: 'auth.set-new-password',
      component: SetNewPassword,
      meta: { guarded: false },
    },
    {
      path: '/auth/callback',
      name: 'auth.google.oauth.callback',
      component: GoogleOAuth,
      meta: { guarded: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { guarded: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }
  ],
});

// Guard ដែលមានលក្ខខណ្ឌច្បាស់លាស់ ការពារការចេញផ្ទាំងស
router.beforeEach((to) => {
  const token = localStorage.getItem('SANCTUM-TOKEN');

  // ១. បើគ្មាន Token ហើយព្យាយាមចូល Dashboard -> រុញទៅ Signin
  if (to.meta.guarded && !token) {
    return { name: 'auth.signin' };
  }

  // ២. បើមាន Token ហើយ ចូលទំព័រ Signin -> រុញទៅ Dashboard
  if (to.name === 'auth.signin' && token) {
    return { name: 'dashboard' };
  }

  // បើគ្មានបញ្ហាទេ ឱ្យ Render Component តាមធម្មតា
  return true;
});

export default router;