<template>
  <v-app>
    <navbar :isLoggedIn="logged"></navbar>
    <v-main>
      <router-view :isLoggedIn="logged"/>
    </v-main>
  </v-app>
</template>

<script>
import navbar from './components/navbar.vue';

export default {
  components: { navbar },
  name: 'App',

  data: () => ({
    logged: false,
    checkLoginLoading: true,
  }),
  methods: {
    CheckLogin(){
        this.axios.post('/check-login').then(response => {
          this.logged = true;
          localStorage.setItem('signin', true)
          localStorage.setItem('role' , response.data.role)
          this.checkLoginLoading = false;
        }).catch(() => {
          localStorage.removeItem('signin')
          localStorage.removeItem('token');
          localStorage.removeItem('role')
        });
      },
  },
  mounted() {
    this.CheckLogin();
  },
};
</script>
