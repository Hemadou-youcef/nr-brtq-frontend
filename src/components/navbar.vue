<template>
  <div>
    <v-app-bar
        app
        mobile-break-point="960"
        color="#7c6e59"
        flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" width="260"  app>
        <v-card flat class="pa-2 pt-4 darken-2 white--text font-weight-bold rounded-0" height="64px" color='#41392d'>
          <v-icon color="white" large>
            mdi-desk
          </v-icon>
          <span :class="`text-subtitle-${(MiniLogo)?'2':'1'}`">
            NR BUREAUTIQUE
          </span>
        </v-card>
        <v-divider></v-divider>
        <v-list-item-group class="pt-3" v-model="selectedItem">
          <v-list>
            <v-list-item
                class="mx-4 mb-2 d-flex align-center justify-center rounded-lg"
                v-for="item in drawer_items" :key="item.item"
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
          </v-list>
        </v-list-item-group>


      </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      drawer: true,
      drawer_items: [
        {'item': 'Home', 'icon': 'mdi-view-dashboard', 'to': '/'},
        {'item': 'Meubles', 'icon': 'mdi-desk', 'to': '/meubles'},
        {'item': 'About US', 'icon': 'mdi-account-supervisor', 'to': '/about-us'},
      ]
    }),
  }
</script>
