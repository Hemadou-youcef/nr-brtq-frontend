<template>
  <div>
    <v-card class="pa-5 mx-auto" max-width="600">
      <v-alert dense outlined v-if="response.show" :type="response.type">
        {{ response.message }}
      </v-alert>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="UserForm.name"
          :rules="nameRules"
          label="NAME"
          prepend-icon="mdi-account"
          class="pa-2"
          background-color="white"
          hide-details
          outlined
          required
        ></v-text-field>

        <v-text-field
          v-model="UserForm.surname"
          :rules="nameRules"
          label="SURNAME"
          prepend-icon="mdi-account"
          class="pa-2"
          background-color="white"
          hide-details
          outlined
          required
        ></v-text-field>
        <v-text-field
          label="Email"
          type="email"
          v-model="UserForm.email"
          prepend-icon="mdi-mail"
          :rules="emailRules"
          class="pa-2"
          background-color="white"
          hide-details
          outlined
          required
        ></v-text-field>

        <v-text-field
          v-model="UserForm.username"
          :rules="nameRules"
          label="User Name"
          prepend-icon="mdi-account"
          class="pa-2"
          background-color="white"
          hide-details
          outlined
          required
        ></v-text-field>

        <v-text-field
          v-model="UserForm.password"
          :rules="nameRules"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
          class="pa-2"
          background-color="white"
          :type="show4 ? 'text' : 'password'"
          hide-details
          outlined
          required
          @click:append="show4 = !show4"
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          :loading="loading"
          @click="submit"
        >
          Register
        </v-btn>

        <v-btn color="error" class="mr-4" @click="clear"> Reset Form </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      UserForm: {
        name: "",
        surname: "",
        email: "",
        password: "",
        username: "",
      },
      formErrors: [],
      response: {
        show: false,
        type: "primary",
        message: "ADD USER",
      },
      testImg: "",
      ActionLoading: false,
      show4: false,
      valid: false,
      checkbox: false,
      loading: false,
      requireField: [(v) => !!v || "field is required"],
      emailRules: [
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      nameRules: [
        (v) => !!v || "required",
        (v) => (v && v.length >= 4) || "must be less than 4 characters",
      ],
    };
  },
  computed: {
    xsBreakpoint: function () {
      return this.$vuetify.breakpoint.xs;
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.ActionLoading = true;
        this.addUser();
      }
    },
    addUser() {
      this.ActionLoading = true;
      this.axios.post("/user", this.UserForm).then((response) => {
        this.ActionLoading = false;
        this.clear();
        this.modal = false;
        this.ActionLoading = false;
        location.reload()
        this.showMessage(response.data.message, "success");
      });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
  created() {
    if (this.edit) {
      this.ItemForm.name = this.name;
      this.ItemForm.price = this.price;
      this.ItemForm.description = this.description;
      this.ItemForm.quantity = this.quantity;
    }
  },
};
</script>

<style scoped>
</style>
