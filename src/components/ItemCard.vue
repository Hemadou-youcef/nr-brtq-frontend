<template>
  <v-card class="mx-auto pa-0">
    <v-img
      @click="goto('/item/' + id)"
      :src="'http://localhost:8000' + image"
      height="200px"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title> {{ name }} </v-card-title>

    <v-card-actions v-if="false">
      <v-btn
        :loading="loading"
        class="ma-1"
        color="success lighten-3"
        plain
        outlined
        @click="edit_student(i)"
      >
        <v-icon left> mdi-pencil </v-icon>
        Edit
      </v-btn>

      <v-btn
        :loading="loading"
        class="ma-1"
        color="red"
        @click="delete_student(i)"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CardInfo",
  props: ["name", "description", "image", "id"],
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
