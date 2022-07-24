<template>
  <div class="home d-flex justify-center pa-5">
      <span class="text-h3">
        Comming soon :)
      </span>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      page_name: "MINI-CONTROLL",
      logged: false,
      drawered: true,
      loading: false,
      valid: false,
      show4: false,
      s_admin: [],
      admin: [],
      worker: [],
      response: {
        show: false,
        type: "",
        message: "",
      },
      login_info: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    getAllUser() {
      this.axios
        .get("/user")
        .then((res) => {
          res.data.data.forEach((value) => {
            if(value.role == "1") this.s_admin.push(value)
            else if(value.role == "2") this.admin.push(value)
            else this.worker.push(value)
          });

          this.loadingContents = false;
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          console.log(this.errors);
        });
    },
  },
  mounted(){
    this.getAllUser()
  }
};
</script>
