<template>
  <v-card
    class="mx-auto pa-3"
    max-width="344"
  >
    <v-img
      src="https://blidacomputer.dz/wp-content/uploads/2019/10/bc-erable-1m-1.20m-1.60.png"
      height="200px"
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
  /*.CardInfoSheet{*/
  /*  background-image: linear-gradient(270deg,#3a7bd5,#3a6073);*/
  /*}*/

</style>