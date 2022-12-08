<template>
    <div>      
      <v-dialog v-model="dialog" >
        <RaspberryVue :raspberry-id="idSelected"/>
      </v-dialog>

      <div class="text-h1 ma-8">Liste des Raspberrys </div>
      <div class="text-subtitle-1 ml-12">
        <v-icon color="green-darken-2" size="x-large" class="mr-4 pb-2"  >
          mdi-chip
        </v-icon>
        Nous listons ici l'ensemble des raspberrys présents en base de données
      </div>

      <v-table >
          <thead>
              <tr>
                  <th>Mac</th>
                  <th>Nom</th>
                  <th>Date de création</th>
                  <th>Etat</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="raspberry in raspberries" @click="select(raspberry._id)" >
              <td>{{raspberry.mac}}</td>
              <td>{{raspberry.nom}}</td>
              <td>{{formatDateFR(raspberry.dateCreation)}}</td>
              <td>
              <v-btn icon size="x-small">
                <v-icon :color="getStatusColorFromDate(raspberry.dateDerniereConnexion, 5)" >
                  mdi-square-rounded
                </v-icon>
                <v-tooltip
                    activator="parent"
                    location="start"
                  >{{formatDateFR(raspberry.dateDerniereConnexion)}}</v-tooltip>
              </v-btn>
              </td>
            </tr>
          </tbody>
      </v-table>  
    </div>
</template>

<script setup>
  // On importe nos librairies externes
  // axios permet de faire des requetes vers des APIs REST
  import axios from 'axios'
  // ref permet de rendre des variables réactives en vue3 (composition API)
  import {ref} from 'vue'
  // On utilise une librairie pour simplifier le traitement des dates
  import * as dayjs from 'dayjs'

  // On importe nos composants
  import RaspberryVue from "./Raspberry.vue"

  // On définie nos variables réactives (anciennement data)
  // permet d'ouvrir et fermer la modale
  let dialog = ref(false)
  // Définit le raspberry selectionné
  let idSelected= ref('')
  // Tableau de raspberrys qu'on alimentera depuis le backend
  let  raspberries = ref([])

  // On requete le backend pour récupèrer la liste des raspberrys
  axios({
    method: 'get',
    url: '/api/raspberries/', 
  }).then(function (response) {
      raspberries.value=response.data
  })

  // Retourne vert si la date passée en argument à moins de 10 minutes 
  // configurable
  function getStatusColorFromDate(date, nbMinutes=10){
    let lastConnection=dayjs(date)
    // On soustrait la date actuelle de 10 minutes et on la compare à la dernière connexion
    let isActif=dayjs().subtract(nbMinutes, 'minute').isBefore(lastConnection)

    return isActif?"green":"red"
  }

  function formatDateFR(date){
    return dayjs(date).format('DD-MM-YYYY HH:mm')
  }
    
  // Apellée lors du clic sur une ligne du tableau
  // On ouvre la modale
  // On passe idSelected sur l'id de ligne cliquée
  function select(id){
    dialog.value=true
    idSelected.value=id
  }
</script>