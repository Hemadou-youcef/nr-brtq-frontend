<template>
  <div class="home">
    <v-container>
        <CardInfo :message="`NO SOLD TODAY`"
                  :number="appointmentNumber"
                  :icon="`mdi-calendar`"
                  :firstColor="`162929`"
                  :secondColor="`FF3333`"/>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CardInfo from '../components/CardInfo.vue';
export default {
  name: 'Home',
  components: { CardInfo },
  data() {
    return {
      basisLanguage: 'ar',
    }
  },
}
</script>
