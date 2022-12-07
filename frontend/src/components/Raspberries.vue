<template>
    <div>
        <h1>
            <v-dialog v-model="dialog" >
            <RaspberryVue :raspberry-id="idSelected"/>
            </v-dialog>
    
            Liste des Raspberrys 
            <v-table >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mac</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="raspberry in raspberries" @click="select(raspberry._id)" >
                <td>{{raspberry._id}}</td>
                <td>{{raspberry.mac}}</td>
                <td>{{raspberry.nom}}</td>
                <td>{{raspberry.dateCreation}}</td>
                </tr>
                </tbody>
            </v-table>
           
        </h1>
    </div>
</template>

<script setup>

import RaspberryVue from "./Raspberry.vue"

import axios from 'axios'
import {ref} from "vue"

let dialog = ref(false)
let idSelected= ref('')
let  raspberries = ref([])

axios({
  method: 'get',
  url: '/api/raspberries/',
  
})
  .then(function (response) {
    // handle success
    console.log(response);
    raspberries.value=response.data
    console.log({raspberries})
  })

  function select(id){
    console.log({id})
    dialog.value=true
    idSelected.value=id
  }


</script>