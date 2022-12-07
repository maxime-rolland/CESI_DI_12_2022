<template>
<div>  <v-card>
    <v-card-title>Titre : {{raspberryId}}</v-card-title>
        <v-card-text>
        {{raspberry}}
        <template v-for="etat in raspberry.etatLeds">
            <v-switch v-model="etat.etat" @change="ledsChange"></v-switch>
        </template>
       
        </v-card-text>
        
      </v-card>
      </div>
</template>

<script setup>
import axios from 'axios'
import { ref,defineProps } from 'vue';
const props = defineProps({
  raspberryId: String
})

const raspberry=ref({})

axios({
  method: 'get',
  url: '/api/raspberry/'+props.raspberryId,
  
})
  .then(function (response) {
    // handle success
    console.log(response);
    raspberry.value=response.data
  })

  function ledsChange(){
    axios.post('/api/raspberry/'+props.raspberryId+'/ledsChange',raspberry.value.etatLeds)
  }


</script>