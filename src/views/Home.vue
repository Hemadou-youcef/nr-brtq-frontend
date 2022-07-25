<template>
  <div class="home">
    <v-container>
      <CardInfo
        :message="`PAS VENDU AUJOURD'HUI`"
        :number="'ATTENDEZ LA PROCHAINE FOIS'"
        :icon="`mdi-calendar`"
        :firstColor="`162929`"
        :secondColor="`443126`"
      />
      <!-- ADD GOOGLE MAP -->
      <v-row>
        <v-col md="6" sm="12" xs="12">
          <v-container width="100%" class="mt-5 pa-2 pt-0 elevation-2">
              <v-sheet color="brown" width="100%">
                
                <v-list>
                  <v-subheader class="ma-0 pt-0" style="text-align:center;height:48px"><v-icon class="mr-2">mdi-content-copy</v-icon>cliquez pour copier</v-subheader>
                  <hr />
                  <v-list-item-group>
                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      @click="goto(item.to,item.text)"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-sheet>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12880.74890806158!2d5.434143!3d36.1863282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd12c8e59a6d57572!2sNR%20BUREAUTIQUE!5e0!3m2!1sen!2sdz!4v1658494318456!5m2!1sen!2sdz"
                width="100%"
                height="300px"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
          </v-container>
        </v-col>
        <v-col  md="6" sm="12" xs="12" class="mt-md-5 mt-sm-0 pa-0">
          <v-container width="100%" id="description">
            <v-card elevation="2" class="rounded-2">
              <v-card-title>OFFRE DE SERVICE</v-card-title>
              <v-card-text class="text-subtitle-1">
                <b>NR MOBILIER</b>
                C'est une entreprise de mobilier de bureau et équipant les
                admiistrations publiques et privées.
                <br />
                <span style="color: #59b8de; font-weight: bold"
                  >Nos domaines de compétence:</span
                >
                vente ,installation, distribution, matériel bureautique et
                informatique <br /><br />
                <span style="color: #59b8de; font-weight: bold">NR</span>-Une
                gamme compléte du produits bureautique de qualité pour votre
                bureau MDF - HDF - MELAMINE PVC <br /><br />
                <span style="color: #59b8de; font-weight: bold">NR</span>-Les
                chaisses opérateur et les chaisses visiteurs avec une boone
                garantie de qualité <br /><br />
                <span style="color: #59b8de; font-weight: bold">NR</span>-Toutes
                les fournitures de bureau talles que les drapeaux Dentreprise et
                les drapeaux nationaux <br /><br />
                <span style="color: #59b8de; font-weight: bold">NR</span>-Une
                gamme compléete des armoires et tables de bureaux une bonne
                garantie de qualité MDF - HDF - MELAMINE <br /><br />
                <span style="color: #59b8de; font-weight: bold">NR</span>-Toute
                les fournitures scolaires universitaires <br /><br />
                <span style="color: #59b8de; font-weight: bold">NR</span>-Une
                gamme du bureau en métal <br /><br />
                <span style="color: #59b8de; font-weight: bold">NR</span>-Toutes
                les instalasion de l'hotel chambres a coucher , armoires chaises
                d'hotel
              </v-card-text>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CardInfo from "../components/CardInfo.vue";
export default {
  name: "Home",
  components: { CardInfo },
  data() {
    return {
      basisLanguage: "ar",
      items: [
        {
          icon: "mdi-map-marker-outline",
          text: "AIN TBINET SETIF",
          to: "https://www.google.com/maps/place/NR+BUREAUTIQUE/@36.1863282,5.434143,15z/data=!4m2!3m1!1s0x0:0xd12c8e59a6d57572?sa=X&ved=2ahUKEwiRgYqH0Yz5AhXPwYUKHVYpCmkQ_BJ6BAhAEAU",
        },
        {
          icon: "mdi-phone",
          text: "05 55 91 28 12",
        },
        {
          icon: "mdi-email",
          text: "youcef.hemadou@hotmail.com",
        }
      ],
    };
  },
  methods: {
    goto(url,text) {
      if (url) {
        window.open(url, "_blank");
      }else{
        navigator.clipboard.writeText(text.replace(/ /g, ""));
      }
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
  iframe {
    min-width: 300px;
    height: 100%;
  }
  #description{
    min-width: 300px;
  }
}
</style>