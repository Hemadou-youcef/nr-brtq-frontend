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
        this.axios.get('/check-login').then(response => {
          if(response.data.status == "success"){
            this.logged = true;
          }else{
            localStorage.removeItem('token');
          }
          this.checkLoginLoading = false;
        }).catch(() => {
          localStorage.removeItem('token');
        });
      },
  },
  mounted() {
    this.CheckLogin();
  },
};
</script>
