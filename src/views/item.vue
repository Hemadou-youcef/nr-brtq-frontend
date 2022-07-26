<template>
  <div class="pa-5">
    <v-btn :to="'/' + item.category" class="brown white--text">
      <v-icon class="mr-2"> mdi-arrow-left-box </v-icon>
      Retour to {{ item.category }}
    </v-btn>
    <v-container class="mt-2 pa-md-5 pa-sm-0 rounded-lg" v-if="!notFound">
      <v-row>
        <v-col md="6" sm="12">
          <v-img
            :lazy-src="'https://cdn66.picsart.com/191113910000202.jpg?type=webp&to=crop&r=60'"
            :src="item.image[0]"
            max-height="600px"
            @click="goto(item.image[0])"
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
        </v-col>
        <v-col md="6" sm="15">
          <v-list elevation="2">
            <v-list-item style="text-align:center">
              <v-list-item-content class="text-center">
                <v-list-item-content class="title text-h4" >
                  <span>{{ item.name }}</span>
                </v-list-item-content>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-divider class="mr-5 ml-5 brown"></v-divider> -->
            <div class="ml-5 mr-5 pa-md-3 pa-sm-0">
              <div
                v-html="
                  $sanitize(item.description, {
                    allowedAttributes: {
                      a: ['href'],
                      p: ['style'],
                    },
                  })
                "
              />
            </div>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-if="item.quantity == '1'">
                  <v-icon color="green" class="mb-1 mr-2">
                    mdi-check-bold
                  </v-icon>
                  <span class="title green--text">l'objet est disponible</span>
                </v-list-item-title>

                <v-list-item-title v-else>
                  <v-icon color="red" class="mb-1 mr-2">
                    mdi-close-thick
                  </v-icon>
                  <span class="title red--text">l'objet est indisponible</span>
                </v-list-item-title>
              </v-list-item-content>
              <v-btn
                :color="item.quantity == '1' ? 'green' : 'red'"
                class="white--text"
                small
                tile
                block
                right
                bottom
              >
                {{ item.quantity == "1" ? "disponible" : "indisponible" }}
              </v-btn>
            </v-list-item>
          </v-list>
          <!-- <v-card class="mt-3">
            <v-card-title>
              <v-icon class="mr-2 mt-1" size="35">
                mdi-format-list-bulleted-type
              </v-icon>
              <span class="title">Catégorie: {{ item.category }}</span>
            </v-card-title>
          </v-card> -->
          <v-list class="mt-3">
            <v-list-item class="elevation-2 mb-2">
              <v-list-item-content>
                <v-list-item-title> Catégorie </v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>
                  {{ item.category.toUpperCase() }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="elevation-2 mb-2"
              v-for="(params, index) in item.parameters"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ params.name.toUpperCase() }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>
                  {{ params.value.toUpperCase() }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card class="mt-3" v-if="false">
            <v-card-title>
              <v-icon class="mr-2 mt-1" large> mdi-cash </v-icon>
              <span class="title">Prix: {{ item.price }} DA</span>
            </v-card-title>
          </v-card>
          <v-card
            v-if="
              getauth &&
              (parseInt(getUser['role']) <= 2 || getUser['id'] == item.user_id)
            "
            elevation="0"
            class="ma-2 d-flex justify-space-between"
          >
            <v-btn
              class="ma-1"
              color="success"
              plain
              x-large
              outlined
              @click="editItem_dialog = true"
            >
              <v-icon left> mdi-pencil </v-icon>
              Edit
            </v-btn>
            <v-btn
              class="ma-1 white--text"
              color="red"
              x-large
              @click="deleteItem = true"
            >
              Delete
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md="4"
          sm="6"
          cols="12"
          v-for="(img, index) in item.image.slice(1)"
          :key="index"
          class="mt-3 d-flex"
        >
          <v-img
            :lazy-src="'https://cdn66.picsart.com/191113910000202.jpg?type=webp&to=crop&r=60'"
            :src="img"
            class="align-self-cente"
            @click="goto(img)"
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
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="editItem_dialog"
      transition="dialog-bottom-transition"
      max-width="700"
      :scrollable="false"
    >
      <AddItem
        :category="item.category"
        :edit="true"
        :name="item.name"
        :description="item.description"
        :quantity="item.quantity"
        :price="item.price"
        :tags="item.tags"
        :parameters_="item.parameters"
        :id="this.$route.params.id"
      />
    </v-dialog>
    <v-dialog width="400" v-model="deleteItem">
      <v-card style="overflow: hidden !important" width="400" height="150">
        <div
          class="text-caption font-weight-bold text-center pt-6 black--text"
          style="font-size: 16px !important"
        >
          ÊTES-VOUS SÛR
        </div>

        <v-card-text>
          <v-row class="mt-5" justify="center">
            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="delete_Item"
                  :loading="Deleteloading"
                  v-on="on"
                  v-bind="attrs"
                  outlined
                  icon
                  large
                  color="red"
                >
                  <v-icon color="red">mdi-check</v-icon>
                </v-btn>
              </template>
              <span>Are you sure!</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="deleteItem = false"
                  v-on="on"
                  v-bind="attrs"
                  outlined
                  icon
                  large
                  color="green"
                >
                  <v-icon color="green">mdi-close</v-icon>
                </v-btn>
              </template>
              <span>Cancel</span>
            </v-tooltip>

            <v-spacer></v-spacer>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "../components/AddItem.vue";
export default {
  name: "ITEM",
  components: { AddItem },
  props: ["isLoggedIn"],
  data() {
    return {
      basisLanguage: "ar",
      item: {
        name: "",
        description: "",
        price: "",
        category: "0",
        image: [],
        tags: [],
        id: "",
      },
      notFound: false,
      editItem_dialog: false,
      deleteItem: false,
      arabic: /[\u0600-\u06FF]/,
    };
  },
  computed: {
    getauth() {
      return this.$store.state.authenticated;
    },
    getUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    goto(url) {
      window.location.href = url;
    },
    getItemInfo() {
      let id = this.$route.params.id;
      // convert value of id to prevent xss
      id = id.replace(/[^0-9]/g, "");
      this.axios
        .get("/item/" + id)
        .then((response) => {
          this.item = response.data;
          this.item.parameters = JSON.parse(this.item.parameters);
          this.item.tags = this.item.tags.split(",").map((element) => {
            return element.toUpperCase();
          });
        })
        .catch(() => {
          this.notFound = true;
        });
    },
    delete_Item() {
      this.Deleteloading = true;
      this.axios
        .delete("/item/" + this.$route.params.id)
        .then(() => {
          this.Deleteloading = false;
          this.$router.push("/" + this.item.category);
        })
        .catch(() => {
          this.Deleteloading = false;
        });
    },
    testArabic(text) {
      return this.arabic.test(text);
    },
    testEnglish(text) {
      return !this.arabic.test(text);
    },
  },
  mounted() {
    this.getItemInfo();
  },
};
</script>