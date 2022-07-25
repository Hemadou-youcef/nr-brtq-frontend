<template>
  <div class="home">
    <v-tabs centered grow color="brown">
      <v-tabs-slider></v-tabs-slider>
      <v-tab>ITEM LIST</v-tab>
      <v-tab-item class="pa-2">
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
            v-for="(x, index) in furniture"
            :key="index"
            class="mt-3"
          >
            <ItemCard
              :id="x.id"
              :name="x.name"
              :description="x.description"
              :quantity="x.quantity"
              :panel="true"
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
      </v-tab-item>
      <v-tab>ADD ITEM</v-tab>
      <v-tab-item class="pa-2">
        <AddItem />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "../components/AddItem.vue";
import ItemCard from "../components/ItemCard.vue";
export default {
  name: "Home",
  components: { AddItem,ItemCard },
  data() {
    return {
      page_name: "MINI-CONTROLL",
      logged: false,
      drawered: true,
      loading: false,
      valid: false,
      show4: false,
      furniture: [],
      page: 1,
      pageLength: 1,
      search: "",
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
      this.axios.get("/items").then((response) => {
        this.loading = false;
        this.furniture = response.data.data;
      });
    },
    searchItems() {
      this.loading = true;
      if (this.search == "") {
        this.GetAllfurniture();
      } else {
        this.axios
          .get("/items/" + this.search )
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
          });
      }
    },
    pagination() {
      this.loading = true;
      if (this.search == "") {
        this.axios.get("/items&page=" + this.page).then((response) => {
          this.loading = false;
          this.furniture = response.data.data;
          this.pageLength = response.data.meta.last_page;
        });
      } else {
        this.axios
          .get("/items/" + this.search + "&page=" + this.page)
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
            this.pageLength = response.data.meta.last_page;
          });
      }
      // this.router.push("?page=" + this.search);
    },
  },
  mounted() {
    this.GetAllfurniture();
  },
};
</script>
