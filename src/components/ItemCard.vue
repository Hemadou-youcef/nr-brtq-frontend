<template>
<v-hover v-slot="{ hover }">
  <v-card class="mx-auto pa-0" style="position:relative">
    <!-- :src="'https://nr-brt.herokuapp.com' + image" -->
    <router-link :to="(panel)?'/panel/items/' + id:'/' + category + '/item/' + id"  style="text-decoration: none;">
    <v-img
      :src="image"
      class="white--text"
      
      :lazy-src="'https://cdn66.picsart.com/191113910000202.jpg?type=webp&to=crop&r=60'"
      :height="'300px'"
    >
      <!-- <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template> -->
      <v-expand-transition>
        ds
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out brown darken-2 v-card--reveal text-h2 white--text align-center justify-center"
            style="height: 100%"
          >
            <span>{{ name }}</span>
          </div>
        </v-expand-transition>
      <!-- <v-card-title v-if="!breakpoint" class="text-center d-sm-block d-xs-none" style="background-color:black;opacity:0.6"> {{ name }} </v-card-title> -->
    </v-img>
    </router-link>
    <v-card-title class="align-center d-md-none d-sm-block" > {{ name }} </v-card-title>

        <v-btn
          absolute
          :color="(quantity == '1')?'green':'red'"
          class="white--text"
          
          small
          right
          bottom
        >
          {{ (quantity == '1')?'disponible':'indisponible' }}
        </v-btn>
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
  </v-hover>
</template>
<script>
export default {
  name: "CardInfo",
  props: ["name", "description", "image", "id","quantity","panel","category"],
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
    goto() {
      if(this.panel) this.$router.push('/panel/items/' + this.id);
      else this.$router.push("/" + this.category + '/item/' + this.id);
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
