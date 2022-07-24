<template>
  <v-card class="mx-auto pa-2 " color="brown" >
    <v-card-subtitle class="white--text">
      <b>User ID: {{ id }}</b
      ><br />
      <b>User Name: {{ name }} {{ surname }}</b
      ><br />
      <b
        >email  :
        {{ email }}</b
      >
    </v-card-subtitle>
    <v-btn v-if="canEdit" class="ma-2" color="success"  @click="editUser" >
      <v-icon left> mdi-pencil </v-icon>
      GRANT ROLE
    </v-btn>
    <v-btn v-if="canDelete" class="white--text ma-2" color="red" @click="deleteUser">
      Delete
    </v-btn>
  </v-card>
</template>
<script>
export default {
  name: "CardInfo",
  props: ["name", "surname", "email", "role", "id",'canDelete','canEdit'],
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
    deleteUser(){
      this.$emit("delete",this.id);
    },
    editUser(){
      this.$emit("edit",this.id,this.role);
    }
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
