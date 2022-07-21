<template>
  <div class="home">
    <v-container>
            <v-card class="pa-5 mx-auto rounded-lg" max-width="600">
                <v-alert
                    dense
                    outlined
                    v-if="response.show"
                    :type="response.type"
                    >
                        {{ response.message }}
                </v-alert>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                    v-model="login_info.username"
                    label="User Name"
                    prepend-icon="mdi-account"
                    class="pa-2"
                    v-on:keyup.enter="login"
                    background-color="white"
                    hide-details
                    outlined
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="login_info.password"
                    label="Password"
                    prepend-icon="mdi-lock"
                    class="pa-2"
                    v-on:keyup.enter="login"
                    :type="show4 ? 'text' : 'password'"
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    background-color="white"
                    hide-details
                    outlined
                    required
                    @click:append="show4 = !show4"
                    ></v-text-field>
                    <div class="text-center">
                        <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mx-auto pa-5"
                        :loading="loading"
                        outlined
                        @click="login"
                        >
                            Login
                        </v-btn>
                    </div>
                </v-form>



            </v-card>
        </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      page_name : "MINI-CONTROLL",
      logged : false,
      drawered: true,
      loading:false,
      valid:false,
      show4:false,
      response:{
        show:false,
        type:"",
        message:""
      },
      login_info:{
        "username":"",
        "password":""
      },
    }
  },
  methods: {
    login() {
      this.axios.post('/login', this.login_info).then(response => {
        if(response.data.success){
          this.logged = true;
          this.response.show = true;
          this.response.type = "success";
          this.response.message = "Login Successful";
          localStorage.setItem('token' , response.data.token)
          this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

          this.$router.push('/');
        }else{
          this.response.show = true;
          this.response.type = "error";
          this.response.message = "Login Failed";
        }
      });
    }
  }
}
</script>
