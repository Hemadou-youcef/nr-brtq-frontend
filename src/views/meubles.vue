<template>
  <div class="home">
    <v-container>
        <v-row dense>
            <div v-for="x in 20" :key="x" class="ma-3">
                <ItemCard 
                    :message="`NO SOLD TODAY`"
                    :number="appointmentNumber"
                    :icon="`mdi-calendar`"
                    :firstColor="`1976d2`"
                    :secondColor="`33ccff`"/>

            </div>
        </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemCard from '../components/ItemCard.vue';
export default {
  name: 'Home',
  components: { ItemCard },
  data() {
    return {
      basisLanguage: 'ar',
    }
  },
}
</script>
