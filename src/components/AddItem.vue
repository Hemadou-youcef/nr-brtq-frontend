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
              :prepend-icon="!xsBreakpoint ? 'mdi-pen' : ''"
              v-model="ItemForm.description"
              class="mb-5"
            ></v-textarea>

            <v-text-field
              :error-messages="formErrors.lastname"
              label="PRIX"
              type="number"
              v-model="ItemForm.price"
              required
              class="mt-1"
            ></v-text-field>
            <v-radio-group v-model="ItemForm.quantity" row>
              <v-radio label="AVAILABLE" color="green" value="1"></v-radio>
              <v-radio label="NOT AVAILABLE" color="red" value="0"></v-radio>
            </v-radio-group>
            <v-row v-if="!edit">
              <v-col>
                <v-file-input
                  :rules="requireField"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="ADD IMAGES"
                  v-model="ItemImage.image"
                  prepend-icon="mdi-camera"
                  class="mb-md-2 mb-sm-0"
                  label="Item Image"
                  multiple
                  hide-details
                ></v-file-input>
              </v-col>
              <v-col md="4" sm="12">
                <!-- <v-img
                  v-show="ItemImage.image"
                  :src="ItemImage.imageURL"
                  class="mb-2"
                  width="100%"
                  height="100"
                ></v-img> -->
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
  props: ["category", "edit", "name", "price", "description", "quantity", "id"],
  data() {
    return {
      ItemForm: {
        name: "",
        description: "",
        price: "",
        quantity: "1",
        category: this.category,
        image: "",
      },
      ItemImage: {
        image: null,
        imageBase64List: [],
      },
      formErrors: [],
      testImg: "",
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
    xsBreakpoint: function () {
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
      this.ItemForm.id = this.id;
      this.axios
        .put("/item/" + this.id, this.ItemForm)
        .then(() => {
          location.reload();
          this.ActionLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItem() {
      this.ActionLoading = true;
      this.convertToBase64Multiple(this.ItemImage.image);
    },
    clear() {
      this.$refs.form.reset();
    },
    convertToBase64Multiple(files) {
      let reader = new FileReader();
      reader.onload = () => {
        let base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        this.ItemImage.imageBase64List.push(base64String);
        if (files.slice(1).length == 0) {
          console.log("no file");
          let parameters = {
            action: "upload",
            source: this.ItemImage.imageBase64List,
          };
          this.ItemForm.parameters = parameters;
          this.axios
            .post("/item", this.ItemForm)
            .then(() => {
              this.snackbar = true;
              location.reload();
            })
            .catch((err) => {
              this.ActionLoading = false;
              console.log(err);
              this.formErrors = err.response.data.errors;
              console.log(err);
            });
        } else {
          this.convertToBase64Multiple(files.slice(1));
        }
        return true;
      };
      if (files.length > 0) {
        reader.readAsDataURL(files[0]);
      } 
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
          // this.ActionLoading = false;
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
      this.ItemForm.quantity = this.quantity;
    }
  },
};
</script>

<style scoped>
</style>
