<template>
  <div class="home">
    <v-container>
      <div v-if="getauth">
        <v-btn
          color="primary"
          outlined
          class="mb-2"
          @click="AddItem_dialog = true"
        >
          <v-icon color="primary"> mdi-desk </v-icon>
          ADD ITEM
        </v-btn>
        <!-- <hr />  -->
      </div>
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
            color="brown"
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
            v-if="filter"
            transition="scroll-y-transition"
            class="ma-1 rounded white--text brown darken-3"
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
          cols="12"
          v-for="(x, index) in furniture"
          :key="index"
          class="mt-3"
        >
          <ItemCard
            :id="x.id"
            :name="x.name"
            :description="x.description"
            :quantity="x.quantity"
            :category="category"
            :panel="false"
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
      <AddItem :category="category" :closeDialog="closeOverLay" />
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
      filter: false,
      tagsSelected: [],
      availableSelected: [0, 1],
      tags: [
        "HDF",
        "MDF",
        "BUREAUX",
        "MELAMINE PVC",
        "MELAMINE",
        "TABLE",
        "TABLEAUX",
        "COFFRE",
        "CHAISE",
        "CANAPE",
        "PLACARD",
      ],
    };
  },
  computed: {
    getauth() {
      return this.$store.state.authenticated;
    },
    category() {
      return this.$route.params.category;
    },
    pageParams() {
      return this.$route.query.page;
    },
  },
  watch: {
    search: function () {
      if(!this.filter) this.searchItems();
    },
    page: function () {
      this.pagination();
    },
    pageParams: function (value) {
      console.log(value);
      if (value != undefined) {
        this.page = value;
      } else {
        this.page = 1;
      }
    },
    category: function () {
      this.GetAllfurniture();
      this.basisLanguage = "ar";
      this.logged = false;
      this.AddItem_dialog = false;
      this.page = 1;
      this.loading = true;
      this.search = "";
      this.furniture = [];
      this.tagsSelected = [];
      this.availableSelected = [0, 1];
      this.filter = false;
      document.title = this.$route.params.category.toUpperCase() + + "| NR BUREAUTIQUE";
    },
  },
  methods: {
    GetAllfurniture() {
      this.loading = true;
      this.axios.get("/items?category=" + this.category).then((response) => {
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
        history.pushState({}, null, `${this.$route.path}`);
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
        history.pushState(
          {},
          null,
          `${this.$route.path}?search=${encodeURIComponent(this.search)}`
        );
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
        .get(
          "/items/search?search=" +
            this.search +
            available +
            "&category=" +
            this.category +
            tagName.toLowerCase()
        )
        .then((response) => {
          this.loading = false;
          this.furniture = response.data.data;
          this.pageLength = response.data.meta.last_page;
        });
      if (this.search == "") {
        history.pushState(
          {},
          null,
          `${this.$route.path}?tags=${encodeURIComponent(
            tagName
          )}&available=${encodeURIComponent(available)}`
        );
      } else {
        history.pushState(
          {},
          null,
          `${this.$route.path}?search=${encodeURIComponent(
            this.search
          )}&tags=${encodeURIComponent(tagName)}&available=${encodeURIComponent(
            available
          )}`
        );
      }
    },
    pagination() {
      this.loading = true;
      let tagName = "";
      this.tagsSelected.forEach((tag) => {
        tagName += this.tags[tag] + ",";
      });
      let available = "";

      if (this.availableSelected == [0, 1]) {
        available = "";
      } else if (this.availableSelected.length == 1) {
        available = this.availableSelected[0];
      }


      if (this.search == "") {
        this.axios
          .get(
            "/items/search?available=" +
              available +
              "&category=" +
              this.category +
              tagName.toLowerCase() +
              "&page=" +
              this.page
          )
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
            this.pageLength = response.data.meta.last_page;
          });

        history.pushState(
          {},
          null,
          `${this.$route.path}?tags=${encodeURIComponent(
            tagName
          )}&available=${encodeURIComponent(available)}&page=${this.page}`
        );
      } else {
        this.axios
          .get(
            "/items/search?search=" +
              this.search +
              available +
              "&category=" +
              this.category +
              tagName.toLowerCase() +
              "&page=" +
              this.page
          )
          .then((response) => {
            this.loading = false;
            this.furniture = response.data.data;
            this.pageLength = response.data.meta.last_page;
          });
        history.pushState(
          {},
          null,
          `${this.$route.path}?search=${encodeURIComponent(
            this.search
          )}&tags=${encodeURIComponent(tagName)}&available=${encodeURIComponent(
            available
          )}&page=${this.page}`
        );
      }
    },
    closeOverLay() {
      this.AddItem_dialog = false;
      this.pagination();
    },
  },
  mounted() {
    // this.GetAllfurniture();
    if (this.$route.query.search) {
      this.search = this.$route.query.search;
    }
    if (this.$route.query.tags) {
      this.tagsSelected = this.$route.query.tags.split(",");
    }
    if (this.$route.query.available) {
      this.availableSelected = this.$route.query.available.split(",");
    }
    if (this.$route.query.page) {
      this.page = parseInt(this.$route.query.page);
    }
    this.pagination();

    this.CheckLogin();
    document.title = this.$route.params.category.toUpperCase() + + "| NR BUREAUTIQUE";
  },
};
</script>
