<template>
 <div>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
   <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-thin mb-3" >Buscador de Empleos</h1>
        
    </v-layout>
    <v-layout justify-center> <v-text-field
            label="Escribe palabras clave"
            append-icon="search"
            v-model="busqueda"
          ></v-text-field>
          <v-flex xs4 sm6 d-flex>
        <v-select
          :items="items"
          box
          label="Categoria"
        ></v-select>
      </v-flex>
           <v-btn fab dark color="teal" @click="buscar()">
      <v-icon dark>search</v-icon>
    </v-btn></v-layout>
       </v-parallax>
       <div v-if="bactive != false">
        <resultados :result="result"></resultados>
       </div>
 </div>
</template>
<script>
import axios from 'axios';
import resultados from './resultados.vue';

export default {
    name: 'searchbar',
    props:{
      items: Array
    },
    data: () =>({
      busqueda: '',
      bactive: false,
      result: null
    }),
    mounted(){
        
    },
    methods:{
        buscar(){
         this.$router.push({name:'busqueda', params:{words: this.busqueda}});
        }
    }
}
</script>
