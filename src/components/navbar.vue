<template>
  <div>
    <v-app-bar app mobile-break-point="960" :color="(IsHeInPanelPage)?'primary':'#7c6e59'" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="text-subtitle-2 text-center white--text d-lg-none d-md-block"
        >{{ (IsHeInPanelPage)?'ADMIN PANEL':'NR BUREAUTIQUE'}}</span
      >
      <v-spacer></v-spacer>
      <!-- <v-btn class="ml-auto" v-if="isLoggedIn" @click="logout" icon>
        <v-icon color="white">mdi-export</v-icon>
      </v-btn> -->
      <v-btn v-if="!getauth" :to="'/login'" class="ml-auto" icon>
      <v-icon color="white">mdi-key</v-icon>
      </v-btn>
      <v-btn v-else-if="getauth && IsHeInPanelPage" class="ml-auto" :to="'/'" icon>
        <v-icon color="white">mdi-view-dashboard</v-icon>
      </v-btn>
      <v-btn v-else class="ml-auto" :to="'/panel/users'" icon>
        <v-icon color="white">mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :width="nvWidth"
      app
    >
      <v-card
        flat
        class="pa-2 pt-3 darken-2 white--text font-weight-bold rounded-0"
        height="64px"
        @click="drawer = !drawer"
        :color="(IsHeInPanelPage)?'primary darken-2':'#41392d'"
      >
      <!-- v-if="!drawer || !extraSmall" -->
        <div >
          <v-icon color="white" class="mb-1 mr-3" large> mdi-store </v-icon>
          <span> {{ (IsHeInPanelPage)?'ADMIN PANEL':'NR BUREAUTIQUE'}} </span>
        </div>
        <!-- <v-icon v-else color="white" class="ml-3 mt-0 pt-0" large>
          mdi-menu
        </v-icon> -->
      </v-card>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          class="mx-4 mb-2 d-flex align-center justify-center rounded-lg"
          v-for="item in drawer_items"
          :key="item.item"
          :class="
            metaRoute.toUpperCase().includes(item.item.toUpperCase())
              ? (IsHeInPanelPage)?'primary darken-2':'brown darken-3'
              : ''
          "
          link
          :to="item.to"
          color="white"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ item.item }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="getauth && IsHeInPanelPage"
          class="mx-4 mb-2 d-flex align-center justify-center rounded-lg"
          link
          @click="logout"
          color="white"
        >
          <v-list-item-icon>
            <v-icon>mdi-export</v-icon>
          </v-list-item-icon>
          <v-list-item-content> LOGOUT </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<!-- {'item': 'About US', 'icon': 'mdi-account-supervisor', 'to': '/about-us'}, -->
<script>
export default {
  name: "navbar",
  props: ["isLoggedIn"],
  data: () => ({
    drawer: true,
    drawer_items: [],
    IsHeInPanel: false,
    nvWidth: "255px", 
  }),
  computed: {
    getauth() {
      return this.$store.state.authenticated;
    },
    getRole() {
      return this.$store.state.role;
    },
    getUser() {
      return this.$store.state.user;
    },
    metaRoute() {
      if (this.$route.fullPath.split("/")[1] == "") return "/Accueil";
      else return  this.$route.fullPath;
    },
    FullRoute(){
      return window.location.href
    },
    IsHeInPanelPage(){
      return /panel/i.test(this.$store.state.NavBarTitle);
    },
    extraSmall() {
      return this.$vuetify.breakpoint.xs;
    },
  },
  watch: {
    IsHeInPanelPage() {
      if (this.IsHeInPanelPage && this.getauth) {
        this.IsHeInPanel = true
        this.drawer_items = [
          { item: "Users", icon: "mdi-account", to: "/panel/users" },
          { item: "Items", icon: "mdi-sofa-single", to: "/panel/items" },
          { item: "Sold", icon: "mdi-sofa-single", to: "/panel/sold" },
        ];
      } else {
        this.IsHeInPanel = false
        this.drawer_items = [
          { item: "Accueil", icon: "mdi-view-dashboard", to: "/" },
          { item: "Meubles", icon: "mdi-sofa-single", to: "/meubles" },
          { item: "bureaux", icon: "mdi-desk", to: "/bureaux" },
          { item: "Chaises", icon: "mdi-chair-rolling", to: "/chaises" },
          { item: "scolaires", icon: "mdi-chair-school", to: "/scolaires" },
        ];
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push("/login")
    }
  },
  created() {
    if (this.IsHeInPanelPage && this.getauth) {
        this.IsHeInPanel = true
        this.drawer_items = [
          { item: "Users", icon: "mdi-account", to: "/panel/users" },
          { item: "Items", icon: "mdi-sofa-single", to: "/panel/items" },
          { item: "Sold", icon: "mdi-sofa-single", to: "/panel/sold" },
        ];
      } else {
        this.IsHeInPanel = false
        this.drawer_items = [
          { item: "Accueil", icon: "mdi-view-dashboard", to: "/" },
          { item: "Meubles", icon: "mdi-sofa-single", to: "/meubles" },
          { item: "bureaux", icon: "mdi-desk", to: "/bureaux" },
          { item: "Chaises", icon: "mdi-chair-rolling", to: "/chaises" },
          { item: "scolaires", icon: "mdi-chair-school", to: "/scolaires" },
        ];
      }
  },
};
</script>
