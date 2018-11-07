<template>
    <v-container>
        <template>
             <div class="text-xs-left">
    <v-btn fab dark small color="primary" @click="$router.go(-1)">
      <v-icon dark>arrow_back</v-icon>
    </v-btn>
             </div>
             <div v-if="datos.length == 0">
                 
             <h1>{{datos.length}} RESULTADOS ENCONTRADOS</h1>
         </div>
         <div v-else>
             <h1 class="text-xs-center">{{datos.length}} RESULTADOS ENCONTRADOS</h1>
             <template>         
  <v-data-table
    :headers="headers"
    :items="datos"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
        
        <td class="text-xs-center text-uppercase">{{ props.item.id_empleo }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.ubicacion }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.posicion }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.compañia }}</td>
      <td class="text-xs-left text-uppercase"><router-link class="red--text" :to="{ name: 'empleos', params: { id: props.item.id_empleo }}">Ver completo</router-link></td>
      
    </template>
  </v-data-table>
  </template>
         </div>
        </template>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    name: 'resultados',
    props: {
        result: Array
    },
    data:()=>({
        datos: null,
        busqueda: null,
        headers: [
          {
            text: 'Trabajos',
            align: 'center',
            sortable: false,
            value: 'name'
          },
          { text: 'Ubicacion', value: 'Ubicacion' },
          { text: 'Posicion', value: 'Posicion' },
          { text: 'Compañia', value: 'Compañia' },
          { text: 'Acciones', value: 'Acciones' }
        ]
    }),
    mounted(){
        this.mostrarResults();
    },
    methods:{
        mostrarResults(){
             axios.get('http://localhost/pempleos/empleo/buscar/' + this.$route.params.words)
          .then(res=>{
            this.datos = res.data[0];
           
            
            })
          .catch(err=>console.log(err));
        }
    }
}
</script>
