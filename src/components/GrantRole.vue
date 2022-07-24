<template>
  <v-card style="overflow: hidden !important" width="600" class="pa-5">
    <v-card color="blue darken-3" class="mx-auto mb-2 white--text">
      <v-card-title class="text-h5">
        <h4>(ID {{ id }})</h4>
      </v-card-title>
    </v-card>
    <v-row>
      <v-col col="12" md="8" sm="12" xs="12">
        <v-select
          v-model="edited_user.role"
          :items="user_roles"
          :rules="requireField"
          class="mb-2 rounded-lg mt-1"
          hide-details
          outlined
        ></v-select>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <v-btn
          :loading="grantloading"
          class="mt-2 pa-5 ma-0 white--text"
          color="blue"
          width="100%"
          @click="grant_role"
        >
          <v-icon left> mdi-plus </v-icon>
          GRANT ROLE
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "CardInfo",
  props: ["role", "id"],
  data: () => ({
    loading: false,
    hover: false,
    grantloading:false,
    edited_user: {
      role: "3",
    },
    user_roles: [
      {
        text: "SUPER ADMIN",
        value: "1",
      },
      {
        text: "ADMIN",
        value: "2",
      },
      {
        text: "WORKER",
        value: "3",
      },
    ],
    requireField: [(v) => !!v || "field is required"],
  }),
  computed: {
    styleColor() {
      return (
        "background-image: linear-gradient(270deg,#" +
        this.secondColor +
        " ,#" +
        this.firstColor +
        ")"
      );
    },
    breakpoint() {
      return this.$vuetify.breakpoint.xs;
    },
    SmallAndBelow() {
      return this.$vuetify.breakpoint.smAndBelow;
    },
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    grant_role() {
      this.grantloading = true
      let currentRequest = {
        "id":this.id,
        "role": this.edited_user.role
      }
      this.axios
        .put("/user",currentRequest)
        .then(() => {
          location.reload();
          this.grantloading = false;
        })
        .catch(() => {
          console.log(this.errors);
        });
    },
  },
  created() {
    if (this.lazyLoader) {
      this.$emit("lazyloader");
    }
    this.edited_user.role = this.role
  },
};
</script>

<style>
.v-responsive__content:hover {
  cursor: pointer !important;
}
</style>
