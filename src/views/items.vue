<template>
  <div class="home">
    <v-tabs centered grow color="brown">
      <v-tabs-slider></v-tabs-slider>
      <v-tab>ITEM LIST</v-tab>
      <v-tab-item class="pa-2">
        <v-row>
          <v-col md="10" sm="12" cols="12" class="pa-2 pb-sm-1 pb-0 ma-0">
            <v-text-field
              background-color="white"
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              class="mb-md-2 mb-sm-0 ma-2 mr-0"
              v-model="search"
              hide-details
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            md="2"
            sm="12"
            cols="12"
            class="pa-2 pr-2 pl-4 pt-md-1 pt-sm-1 pt-1 pb-3 ma-0"
          >
            <v-btn
              elevation="2"
              class="white--text mt-md-3"
              height="54px"
              color="primary"
              @click="filter = !filter"
              large
              block
            >
              <v-icon left> mdi-filter-variant </v-icon>
              FILTER
            </v-btn>
          </v-col>
        </v-row>
        <v-expand-transition>
          <div v-if="filter">
            <v-container
              transition="scroll-y-transition"
              class="rounded white--text primary darken-3"
              style="box-sizing: border-box"
            >
              <!-- <v-toolbar flat color="deep-purple accent-4" dark>
          <v-toolbar-title>Filter</v-toolbar-title>
        </v-toolbar> -->
              <h2 class="text-h6 mb-2">
                <v-icon color="white">mdi-filter-variant</v-icon>
                Filter
              </h2>
              <span>Tags: </span>
              <v-chip-group v-model="tagsSelected" column multiple>
                <v-chip
                  class="white--text white"
                  filter
                  outlined
                  v-for="(tag, index) in tags"
                  :key="index"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
              Type:<br />
              <v-btn-toggle
                class="mt-2"
                v-model="availableSelected"
                multiple
                mandatory
              >
                <v-btn>
                  <v-icon>mdi-close-thick</v-icon>
                  indisponible
                </v-btn>
                <v-btn>
                  <v-icon>mdi-check-bold</v-icon>
                  disponible
                </v-btn>
              </v-btn-toggle>

              <v-btn
                elevation="2"
                class="mt-3"
                height="54px"
                color="WHITE"
                @click="searchWithFilter"
                large
                block
              >
                <v-icon left> mdi-magnify </v-icon>
                SEARCH
              </v-btn>
            </v-container>
          </div>
        </v-expand-transition>
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
  components: { AddItem, ItemCard },
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
      filter: false,
      tagsSelected: [],
      availableSelected: [0, 1],
      tags: ["HDF", "MDF", "BUREAUX", "MELAMINE PVC", "Avec meroir"],
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
        this.pageLength = response.data.meta.last_page;
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
      if (this.search == "") {
        this.GetAllfurniture();
      } else {
        this.axios
          .get(
            "/items/search?search=" + this.search + "&category=" + this.category
          )
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
            this.pageLength = response.data.meta.last_page;
          });
      }
    },
    searchWithFilter() {
      this.loading = true;
      let tagName = "&tags=";
      this.tagsSelected.forEach((tag) => {
        tagName += this.tags[tag] + ",";
      });
      if (tagName == "&tags=") tagName = "";
      else tagName = tagName.substring(0, tagName.length - 1);
      let available = "";
      if (this.availableSelected == [0, 1]) {
        available = "";
      } else if (this.availableSelected.length == 1) {
        available = "&available=" + this.availableSelected[0];
      }
      this.axios
        .get("/items/search?search=" + this.search + available + tagName)
        .then((response) => {
          this.loading = false;
          this.furniture = response.data.data;
          this.pageLength = response.data.meta.last_page;
        });
    },
    pagination() {
      this.loading = true;
      if (this.search == "") {
        this.loading = true;
        let tagName = "&tags=";
        this.tagsSelected.forEach((tag) => {
          tagName += this.tags[tag] + ",";
        });
        if (tagName == "&tags=") tagName = "";
        else tagName = tagName.substring(0, tagName.length - 1);
        let available = "";
        if (this.availableSelected == [0, 1]) {
          available = "";
        } else if (this.availableSelected.length == 1) {
          available = "&available=" + this.availableSelected[0];
        }
        this.axios
          .get(
            "/items/search?search=" +
              this.search +
              available +
              tagName +
              "&page=" +
              this.page
          )
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
            this.pageLength = response.data.meta.last_page;
          });
      } else {
        this.axios
          .get("/items/search?search=" + this.search + "&page=" + this.page)
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
            this.pageLength = response.data.meta.last_page;
          });
      }
      // this.router.push("?page=" + this.search);
    },
    closeOverLay() {
      this.AddItem_dialog = false;
      this.pagination();
    },
  },
  mounted() {
    this.GetAllfurniture();
  },
};
</script>
