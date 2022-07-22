<template>
  <div class="home">
    <v-container>
      <div v-if="logged">
        <v-btn
          color="primary"
          outlined
          class="mb-2"
          @click="AddItem_dialog = true"
        >
          <v-icon color="primary"> mdi-desk </v-icon>
          ADD ITEM
        </v-btn>
        <!-- <hr /> -->
      </div>
      <v-text-field
        background-color="white"
        hide-details
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        class="mb-2 ma-2"
        outlined
      ></v-text-field>
      <v-row dense>
        <v-col md="4" sm="6" xs="12" v-for="x in 20" :key="x" class="mt-3">
          <ItemCard
            :message="`NO SOLD TODAY`"
            :number="appointmentNumber"
            :icon="`mdi-calendar`"
            :firstColor="`1976d2`"
            :secondColor="`33ccff`"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="AddItem_dialog"
      transition="dialog-bottom-transition"
      max-width="500"
      :scrollable="false"
      @click:outside="closeOverLay(true)"
    >
      <AddItem />
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemCard from "../components/ItemCard.vue";
import AddItem from "../components/AddItem.vue";

export default {
  name: "Home",
  components: { ItemCard, AddItem },
  data() {
    return {
      basisLanguage: "ar",
      logged: false,
      AddItem_dialog: false,
      furniture: [],
    };
  },
  methods: {
    GetAllfurniture() {
      this.axios.get("/items").then((response) => {
        this.furniture = response.data.data;
      });
    },
    CheckLogin() {
      this.axios.get("/check-login").then((response) => {
        if (response.data.status == "success") {
          this.logged = true;
        }
      });
    },
  },
  mounted() {
    this.GetAllfurniture();
    this.CheckLogin();
  },
};
</script>
