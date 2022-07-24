<template>
  <v-card class="mx-auto pa-2" style="position: relative">
    <v-card-subtitle class="pb-0">
      <b>User ID: {{ id }}</b
      ><br />
      <b>User Name: {{ name }} {{ surname }}</b
      ><br />
      <b
        >email  :
        {{ email }}</b
      >
    </v-card-subtitle>
    <v-btn class="ma-2" color="success" plain outlined>
      <v-icon left> mdi-pencil </v-icon>
      Edit
    </v-btn>
    <v-btn class="white--text ma-2" color="red" @click="deleteItem = true">
      Delete
    </v-btn>
  </v-card>
</template>
<script>
export default {
  name: "CardInfo",
  props: ["name", "surname", "email", "role", "id"],
  data: () => ({
    loading: false,
    hover: false,
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
  },
  watch: {
    message() {
      if (this.lazyLoader) {
        this.$emit("lazyloader");
      }
    },
    number() {
      if (this.lazyLoader) {
        this.$emit("lazyloader");
      }
    },
  },
  created() {
    if (this.lazyLoader) {
      this.$emit("lazyloader");
    }
  },
};
</script>

<style>
.v-responsive__content:hover {
  cursor: pointer !important;
}
</style>
