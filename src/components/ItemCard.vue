<template>
  <v-card
    class="mx-auto pa-3"
  > 
    <v-img
      @click="goto('/meuble')"
      src="https://blidacomputer.dz/wp-content/uploads/2019/10/bc-erable-1m-1.20m-1.60.png"
    ></v-img>

    <v-card-title>
      Top western road trips
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-card-actions>
      <v-btn
        class="red"
        @click="deleteConsultationDialog = true"
      >
        <v-icon color="white">mdi-delete</v-icon>
      </v-btn>
      <v-btn
        class="green"
        @click="deleteConsultationDialog = true"
      >
        <v-icon color="white">mdi-pen</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
name: "CardInfo",
  props: [
      'message','number','icon','firstColor','secondColor','mode',"lazyLoader"
  ],
  computed:{
    styleColor(){
      return 'background-image: linear-gradient(270deg,#' + this.secondColor +  ' ,#' + this.firstColor +  ')';
    }

  },
  methods:{
    goto(url){
      this.$router.push(url);
    }
  },
  watch:{
    message(){
      if(this.lazyLoader){
        this.$emit('lazyloader')
      }
    },
    number(){
      if(this.lazyLoader){
        this.$emit('lazyloader')
      }
    }
  },
  created() {
    if(this.lazyLoader){
      this.$emit('lazyloader')
    }

  }
}
</script>

<style scoped>
    img:hover{
      cursor: pointer;
    }
</style>