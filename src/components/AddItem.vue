<template>
  <div>
    <v-card class="pa-6">

      <v-card-text class="pt-4">
        <v-row justify="center" class="font-weight-black">
          <div>ADD NEW ITEM</div>

        </v-row>
        <div>
          <v-form v-model="valid" ref="form">
            <v-text-field
                :error-messages="formErrors.firstname"
                @focus="formErrors.firstname= ''"
                label="ITEM NAME"
                v-model="patientForm.firstname"
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
                    prepend-icon="mdi-pen"
                    class="mb-5"
            ></v-textarea>
            <v-text-field
                :error-messages="formErrors.lastname"
                @focus="formErrors.lastname= ''"
                label="PRIX"
                v-model="patientForm.lastname"
                :rules="requireField"
                required
                class="mt-1"
            ></v-text-field>
            <v-text-field
                :error-messages="formErrors.lastname"
                @focus="formErrors.lastname= ''"
                label="QUANTITY"
                v-model="patientForm.lastname"
                :rules="requireField"
                required
                class="mt-1"
            ></v-text-field>

            <v-layout justify-space-between>
              <v-spacer></v-spacer>
              <v-btn @click="submit" color="secondary" :disabled="!valid"
                     :class=" { 'blue darken-4 white--text' : valid, 'disabled': !valid }">
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

  data() {
    return {

      patientForm: {
        firstname: '',
        lastname: '',
        password: '',
        phone: '',
        email: '',
        birthday: new Date().toISOString().substr(0, 10),
        gender: '',
        bloodType: '',
        address: '',

      },
      patientImage: {
        image: null,
        imageURL: '',
      },
      formErrors: [],

      genders: ['male', 'female'],
      bloodType: ['O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      valid: false,
      menu: false,
      modal: false,
      text: `Patient added`,
      requireField: [
        (v) => !!v || 'field is required',
      ],
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {

        this.addPatient()

      }
    },
    addPatient() {
      this.axios.post('/patient/create',
          this.patientForm,
      ).then(res => {


        this.snackbar = true;

        if (this.patientImage.imageURL) {
          console.log('there is an image')
          this.updateImage(res.data.id)
        } else {
          this.$emit('closeDialog', 'Patient Added');
        }
        this.clear()
      }).catch(err => {
        console.log(err)
        this.formErrors = err.response.data.errors
        console.log(err)
      })
    }
    ,
    clear() {
      this.$refs.form.reset()
    },
    updateImage(id) {
      let data = new FormData();
      data.append('image', this.patientImage.image)
      this.axios.post(`/image/${id}`, data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      }).then(res => {
        console.log(res)
        this.$emit('closeDialog', 'Patient Added');
      })
    },
    previewImage() {
      console.log(this.patientImage)
      if (this.patientImage.image) {

        this.patientImage.imageURL = URL.createObjectURL(this.patientImage.image)
      } else {
        this.patientImage.imageURL = ''
      }
    }
  },
}
</script>

<style scoped>
</style>
