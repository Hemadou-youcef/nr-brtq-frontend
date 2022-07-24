<template>
  <v-app>
    <navbar></navbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import navbar from "./components/navbar.vue";

export default {
  components: { navbar },
  name: "App",

  data: () => ({
    logged: false,
    checkLoginLoading: true,
  }),
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
    
  },
  methods: {
    // CheckLogin() {
    //   this.axios
    //     .post("/check-login")
    //     .then((response) => {
    //       this.logged = true;
    //       localStorage.setItem("signin", true);
    //       localStorage.setItem("user_id", response.data.id);
    //       localStorage.setItem("user_name", response.data.name);
    //       localStorage.setItem("user_surname", response.data.surname);
    //       localStorage.setItem("user_email", response.data.email);
    //       localStorage.setItem("role", response.data.role);

    //       this.checkLoginLoading = false;
    //     })
    //     .catch(() => {
    //       localStorage.removeItem("signin");
    //       localStorage.removeItem("user_id");
    //       localStorage.removeItem("user_name");
    //       localStorage.removeItem("user_surname");
    //       localStorage.removeItem("user_email");
    //       localStorage.removeItem("role");
    //       localStorage.removeItem("token");
    //     });
    // },
  },
  mounted() {
    this.$store.dispatch('getUser')
  },
};
</script>
