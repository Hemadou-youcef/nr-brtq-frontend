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
              :rules="requireField"
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

            <!-- <v-textarea
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
            ></v-textarea> -->
            <editor
              style="direction:rtl"
              api-key="no-api-key"
              v-model="ItemForm.description"
              :init="{
                height: 300,
                menubar: false,
                plugins: [
                  'autolink lists link image charmap print preview anchor',
                  'visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount emoticons',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
              }"
            />
            <v-sheet class="ma-3 pa-0" >
                <v-list class="py-0">
                  <v-list-item class="primary font-weight-bold rounded-lg mb-2" style="text-align: center">
                    <v-list-item-content>
                      <v-list-item-title class="white--text text-h6">
                        Parameters
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action class="pa-0 ma-0">
                      <v-btn
                          color="white"
                          @click="parameters.push({name:'',value:''})"
                          icon>
                        <v-icon color="white">
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item class="pa-1 elevation-0 mb-2 rounded-lg" v-for="(parameter,index) in parameters" :key="index">

                    <v-list-item-content class="ma-0 pa-1">
                      <v-text-field
                          hide-details
                          color="purple"
                          class="pa-0 elevation-0"
                          placeholder="name"
                          v-model="parameter.name"
                          :rules="requireField"
                          height="20px"
                          dense
                          outlined
                      ></v-text-field>
                    </v-list-item-content>

                    <v-list-item-content class="ma-0 pa-1">
                      <v-text-field
                          hide-details
                          class="pa-0 elevation-0"
                          placeholder="value"
                          v-model="parameter.value"
                          :rules="requireField"
                          height="40px"
                          dense
                          outlined
                      ></v-text-field>
                    </v-list-item-content>
                    <v-list-item-action class="ma-0 ml-1 fill-height">
                      <v-btn
                          class="fill-height elevation-0"
                          @click="parameters.splice(index, 1)"
                          color="white"
                          icon>
                        <v-icon color="red">
                          mdi-close-thick
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-sheet>
            <v-text-field
              v-if="false"
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
            <v-file-input
              v-if="!edit"
              :rules="requireField"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="ADD IMAGES"
              v-model="ItemImage.image"
              prepend-icon="mdi-camera"
              class=""
              label="Item Image"
              multiple
              hide-details
            ></v-file-input>
            <v-layout class="mt-3" justify-space-between>
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
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "Login",
  props: [
    "category",
    "edit",
    "name",
    "price",
    "description",
    "quantity",
    'parameters_',
    "id",
    "full_screen",
  ],
  components: {
    editor: Editor,
  },
  data() {
    return {
      ItemForm: {
        name: "",
        description: "",
        price: "",
        quantity: "1",
        category: this.category,
        image: "",
        tags: "",
      },
      parameters: [],
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
      this.ItemForm.parameters = JSON.stringify(this.parameters)
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
          let images = {
            action: "upload",
            source: this.ItemImage.imageBase64List,
          };
          this.ItemForm.parameters = JSON.stringify(this.parameters)
          this.ItemForm.images = images;
          this.axios
            .post("/item", this.ItemForm)
            .then(() => {
              this.snackbar = true;
              if (!this.full_screen) location.reload();
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
      this.parameters = this.parameters_;
    }
  },
};
</script>

<style scoped>
</style>
