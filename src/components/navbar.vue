<template>
  <div>
    <v-app-bar
        app
        mobile-break-point="960"
        color="#7c6e59"
        flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="text-subtitle-2 text-center white--text d-lg-none d-md-block">NR BUREAUTIQUE</span>
      <v-spacer></v-spacer>
      <v-btn class="ml-auto" v-if="isLoggedIn" @click="logout" icon>
        <v-icon color="white">mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" width="260"  app>
        <v-card flat class="pa-2 pt-4 darken-2 white--text font-weight-bold rounded-0" height="64px" color='#41392d'>
          <v-icon color="white" class="mb-1 mr-3" large>
            mdi-store
          </v-icon>
          <span>
            NR BUREAUTIQUE
          </span>
        </v-card>
        <v-divider></v-divider>
        <!-- <v-list-item-group class="pt-3"> -->
          <v-list>
            <v-list-item
                class="mx-4 mb-2 d-flex align-center justify-center rounded-lg"
                v-for="item in drawer_items" :key="item.item"
                :class="( metaRoute.toUpperCase() == item.to.toUpperCase())?'brown darken-3':''"
                link :to="item.to"
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
            v-if="!isLoggedIn && !isThereValueInLocalStorage"
            class="mx-4 mb-2 d-flex align-center justify-center rounded-lg"
            :class="( metaRoute.toUpperCase() == '/LOGIN')?'brown darken-3':''"
            link :to="'/login'"
            color="white"
            >
              <v-list-item-icon>
                <v-icon>mdi-key</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                LOGIN
              </v-list-item-content>
            </v-list-item>
          </v-list>
        <!-- </v-list-item-group> -->


      </v-navigation-drawer>
  </div>
</template>
<!-- {'item': 'About US', 'icon': 'mdi-account-supervisor', 'to': '/about-us'}, -->
<script>
  export default {
    name: 'navbar',
    props: ["isLoggedIn"],
    data: () => ({
      drawer: true,
      drawer_items: [
        {'item': 'Accueil', 'icon': 'mdi-view-dashboard', 'to': '/'},
        {'item': 'Meubles', 'icon': 'mdi-sofa-single', 'to': '/meubles'},
        {'item': 'bureaux', 'icon': 'mdi-desk', 'to': '/bureaux'},
        {'item': 'Chaises', 'icon': 'mdi-chair-rolling', 'to': '/chaises'},
        {'item': 'scolaires', 'icon': 'mdi-chair-school', 'to': '/scolaires'},
      ]
    }),
    computed: {
      metaRoute(){
        if(this.$route.fullPath.split('/')[1] == '')
          return '/';
        else
          return "/" + this.$route.fullPath.split('/')[1];
      },
      isThereValueInLocalStorage(){
        return localStorage.getItem('token') != null;
      },
    },
    methods :{
      logout(){
        this.axios.post('/logout').then(response => {
          if(response.data.status == "success"){
            this.isLoggedIn = false;
            localStorage.removeItem('token');
            window.location.href = "/";
          }
        });
      }
    },
  }
</script>
