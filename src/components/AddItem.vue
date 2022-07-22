<template>
  <div>
    <v-card class="pa-6">
      <v-card-text class="pt-4">
        <v-row justify="center" class="font-weight-black">
          <div>ADD NEW ITEM</div>
        </v-row>
        <div>
          <v-form v-model="valid" ref="form">
            <v-select
              :items="categoryList"
              v-model="ItemForm.category"
              label="Catégorie"
              class="mt-5"
              :disabled="edit"
              hide-details
              dense
              outlined
            ></v-select>
            <v-text-field
              :error-messages="formErrors.firstname"
              label="ITEM NAME"
              v-model="ItemForm.name"
              :rules="requireField"
              required
              class="mt-1"
            ></v-text-field>

            <v-textarea
              outlined
              auto-grow
              clearable
              hide-details
              background-color="white"
              name="input-7-4"
              label="ITEM DESCRIPTION"
              :prepend-icon="!xsBreakpoint?'mdi-pen':''"
              v-model="ItemForm.description"
              class="mb-5"
            ></v-textarea>
            <v-text-field
              :error-messages="formErrors.lastname"
              @focus="formErrors.lastname = ''"
              label="PRIX"
              v-model="ItemForm.price"
              required
              class="mt-1"
            ></v-text-field>
            <v-text-field
              :error-messages="formErrors.lastname"
              @focus="formErrors.lastname = ''"
              label="QUANTITY"
              required
              class="mt-1"
            ></v-text-field>
            <v-row v-if="!edit">
              <v-col>
                <v-file-input
                  :rules="requireField"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  v-model="ItemImage.image"
                  prepend-icon="mdi-camera"
                  label="Item Image"
                  @change="previewImage"
                ></v-file-input>
              </v-col>
              <v-col cols="4">
                <v-img
                  v-show="ItemImage.image"
                  :src="ItemImage.imageURL"
                  width="100"
                  height="100"
                ></v-img>
              </v-col>
            </v-row>
            <v-layout justify-space-between>
              <v-spacer></v-spacer>
              <v-btn
                v-if="edit"
                @click="editItem"
                :loading="ActionLoading"
                :disabled="!valid"
                :class="{
                  'green darken-4 white--text': valid,
                  disabled: !valid,
                }"
              >
                EDIT ITEM
                <v-icon color="white" class="pl-2">mdi-pen</v-icon>
              </v-btn>
              <v-btn
                v-else
                @click="submit"
                :loading="ActionLoading"
                :disabled="!valid"
                :class="{
                  'blue darken-4 white--text': valid,
                  disabled: !valid,
                }"
              >
                ADD ITEM
                <v-icon color="white" class="pl-2">mdi-plus-box</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
            </v-layout>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: ["category", "edit", "name", "price", "description", "id"],
  data() {
    return {
      ItemForm: {
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: this.category,
        image: "",
      },
      ItemImage: {
        image: null,
        imageURL: "",
      },
      formErrors: [],

      valid: false,
      menu: false,
      modal: false,
      ActionLoading: false,
      text: `item added`,
      categoryList: [
        {
          text: "MEUBLES",
          value: "meubles",
        },
        {
          text: "SCOLAIRES",
          value: "scolaires",
        },
        {
          text: "BUREAUX",
          value: "bureaux",
        },
        {
          text: "CHAISES",
          value: "chaises",
        },
      ],
      requireField: [(v) => !!v || "field is required"],
    };
  },
  computed: {
    xsBreakpoint: function() {
      return this.$vuetify.breakpoint.xs;
    },

  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.ActionLoading = true;
        this.addItem();
      }
    },
    editItem() {
      this.ActionLoading = true;
      this.axios
        .put("/item/" + this.id, this.ItemForm)
        .then(() => {
          this.ActionLoading = false;
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItem() {
      this.axios
        .post("/item", this.ItemForm)
        .then((res) => {
          this.snackbar = true;
          
          if (this.ItemImage.imageURL) {
            console.log("there is an image");
            this.updateImage(res.data.item_id);
          } else {
            location.reload();
            this.$emit("closeDialog");
          }
          this.clear();
        })
        .catch((err) => {
          this.ActionLoading = false;
          console.log(err);
          this.formErrors = err.response.data.errors;
          console.log(err);
        });
    },
    clear() {
      this.$refs.form.reset();
    },
    updateImage(id) {
      let data = new FormData();
      data.append("image", this.ItemImage.image);
      this.axios
        .post(`/image/${id}`, data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.ActionLoading = false;
          location.reload();
          this.$emit("closeDialog");
        });
    },
    previewImage() {
      console.log(this.ItemImage);
      if (this.ItemImage.image) {
        this.ItemImage.imageURL = URL.createObjectURL(this.ItemImage.image);
      } else {
        this.ItemImage.imageURL = "";
      }
    },
  },
  created() {
    if (this.edit) {
      this.ItemForm.name = this.name;
      this.ItemForm.price = this.price;
      this.ItemForm.description = this.description;
    }
  },
};
</script>

<style scoped>
</style>
