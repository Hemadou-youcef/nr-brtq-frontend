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
          <v-icon color="primary"> mdi-chair-school </v-icon>
          ADD ITEM
        </v-btn>
        <!-- <hr />  -->
      </div>
      <v-text-field
        background-color="white"
        hide-details
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        class="mb-2 ma-2"
        v-model="search"
        outlined
      ></v-text-field>
      <div class="text-center ma-3">
        <v-progress-circular
          indeterminate
          color="brown"
          v-if="loading"
        ></v-progress-circular>
      </div>

      <v-row v-if="!loading" dense>
        <v-container v-if="furniture.length == 0" class="text-center">
          <v-icon> mdi-note-off-outline </v-icon>
          AUCUN ÉLÉMENT TROUVÉ
        </v-container>
        <v-col
          md="4"
          sm="6"
          xs="12"
          v-for="(x,index) in furniture"
          :key="index"
          class="mt-3"
        >
          <ItemCard
            :id="x.id"
            :name="x.name"
            :description="x.description"
            :quantity="x.quantity"
            :image="x.image[0]"
          />
        </v-col>
      </v-row>
      <div class="text-center mt-3">
        <v-pagination
          v-model="page"
          :length="pageLength"
          :total-visible="3"
          color="brown"
        ></v-pagination>
      </div>
    </v-container>
    <v-dialog
      v-model="AddItem_dialog"
      transition="dialog-bottom-transition"
      max-width="500"
      :scrollable="false"
      @click:outside="closeOverLay(true)"
    >
      <AddItem :category="'scolaires'" :closeDialog="closeDialog"/>
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
      page: 1,
      pageLength: 1,
      loading: true,
      search: "",
      furniture: [],
    };
  },
  watch: {
    search: function () {
      this.searchItems();
    },
    page: function () {
      this.pagination();
    },
  },
  methods: {
    GetAllfurniture() {
      this.loading = true;
      this.axios.get("/items?category=scolaires").then((response) => {
        this.loading = false;
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
    searchItems() {
      this.loading = true;
      if(this.search == ""){
        this.GetAllfurniture();
      }else{
        this.axios
          .get("/items/" + this.search + "?category=bureaux")
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
          });
      }
    },
    pagination() {
      this.loading = true;
      if (this.search == "") {
        this.axios
          .get("/items?category=scolaires&page=" + this.page)
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
            this.pageLength = response.data.meta.last_page;
          });
      } else {
        this.axios
          .get(
            "/items/" + this.search + "?category=scolaires&page=" + this.page
          )
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
            this.pageLength = response.data.meta.last_page;
          });
      }
      // this.router.push("?page=" + this.search);
    },
    closeDialog() {
      this.AddItem_dialog = false;
      this.pagination()
    },
  },
  mounted() {
    this.GetAllfurniture();
    this.CheckLogin();
  },
};
</script>
