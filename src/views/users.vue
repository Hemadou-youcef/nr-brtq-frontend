<template>
  <div class="home">
    <v-card class="mb-5" elevation="0">
      <v-card-subtitle class="pb-0">
        <b>User ID: {{ UserInfo["user_id"] }}</b
        ><br />
        <b
          >User Name: {{ UserInfo["user_name"] }}
          {{ UserInfo["user_surname"] }}</b
        ><br />
        <b>email : {{ UserInfo["user_email"] }}</b>
      </v-card-subtitle>
    </v-card>
    <v-tabs centered grow color="primary">
      <v-tabs-slider></v-tabs-slider>
      <v-tab>SUPER ADMIN</v-tab>
      <v-tab-item class="pa-2">
        <v-row>
          <v-col
            md="4"
            sm="6"
            xs="12"
            v-for="(user, index) in s_admin"
            :key="index"
          >
            <UserCard
              :canEdit="false"
              :canDelete="false"
              v-on:delete="deleteConformation"
              v-on:edit="editForm"
              :id="user.id"
              :name="user.name"
              :surname="user.surname"
              :email="user.email"
              :role="user.role"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab>ADMIN</v-tab>
      <v-tab-item class="pa-2">
        <v-row>
          <v-col
            md="4"
            sm="6"
            xs="12"
            v-for="(user, index) in admin"
            :key="index"
          >
            <UserCard
              :canEdit="UserInfo['role'] == '1'"
              :canDelete="UserInfo['role'] == '1'"
                v-on:delete="deleteConformation"
                v-on:edit="editForm"
              :id="user.id"
              :name="user.name"
              :surname="user.surname"
              :email="user.email"
              :role="user.role"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab>WORKER</v-tab>
      <v-tab-item class="pa-2">
        <v-row>
          <v-col
            md="4"
            sm="6"
            xs="12"
            v-for="(user, index) in worker"
            :key="index"
          >
            <UserCard
              :canEdit="parseInt(UserInfo['role']) < 3"
              :canDelete="parseInt(UserInfo['role']) < 3"
              v-on:delete="deleteConformation"
              v-on:edit="editForm"
              :id="user.id"
              :name="user.name"
              :surname="user.surname"
              :email="user.email"
              :role="user.role"
            />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
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
                  @click="deleteUser"
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
    <v-dialog max-width="600" v-model="editUser">
      <GrantRole :id="ChoosenUser" :role="ChoosenUserRole"/>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import UserCard from "../components/UserCard.vue";
import GrantRole from "../components/GrantRole.vue";
export default {
  name: "Home",
  components: { UserCard,GrantRole },
  data() {
    return {
      page_name: "MINI-CONTROLL",
      logged: false,
      drawered: true,
      loading: false,
      valid: false,
      show4: false,
      editItem_dialog: false,
      Deleteloading: false,
      deleteItem:false,
      editUser:false,
      ChoosenUser: -1,
      ChoosenUserRole:'3',
      s_admin: [],
      admin: [],
      worker: [],
      response: {
        show: false,
        type: "",
        message: "",
      },
      login_info: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    UserInfo() {
      let info = {
        user_id: localStorage.getItem("user_id"),
        user_name: localStorage.getItem("user_name"),
        user_surname: localStorage.getItem("user_surname"),
        user_email: localStorage.getItem("user_email"),
        role: localStorage.getItem("role"),
      };
      return info;
    },
  },
  methods: {
    getAllUser() {
      this.axios
        .get("/user")
        .then((res) => {
          res.data.data.forEach((value) => {
            if (value.role == "1") this.s_admin.push(value);
            else if (value.role == "2") this.admin.push(value);
            else this.worker.push(value);
          });

          this.loadingContents = false;
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          console.log(this.errors);
        });
    },
    deleteConformation(id) {
      this.deleteItem = true;
      this.ChoosenUser = id;
    },
    editForm(id,role){
      this.editUser = true;
      this.ChoosenUser = id;
      this.ChoosenUserRole = role;
    },
    deleteUser() {
      this.Deleteloading = true
      this.axios
        .delete("/user/" + this.ChoosenUser)
        .then(() => {
          location.reload();
          this.Deleteloading = false;
        })
        .catch(() => {
          console.log(this.errors);
        });
    },
  },
  mounted() {
    this.getAllUser();
  },
};
</script>
