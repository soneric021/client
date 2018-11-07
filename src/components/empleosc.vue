<template>

<div  class="text-xs-center" v-if="loading"><v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular></div>

   <v-container v-else class=" mt-5">
        <div class="text-xs-left">
    <v-btn fab dark small color="primary" @click="$router.go(-1)">
      <v-icon dark>arrow_back</v-icon>
    </v-btn>
             </div>
   <template>  
       <h3 class="display-2 text-uppercase cyan--text text-md-center mb-5"><span class="white--text">Lista Por Categoria:</span> {{datos[0].nombre}}</h3>       
  <v-data-table
    :headers="headers"
    :items="datos"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
        
        <td class="text-xs-center text-uppercase">{{ props.item.id_empleo }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.ubicacion }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.posicion }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.compañia }}</td>
       <td class="text-xs-left text-uppercase red--text"><router-link :to="{ name: 'empleos', params: { id: props.item.id_empleo }}">Ver completo</router-link></td>
    </template>
  </v-data-table>
  </template>
   </v-container>
</template>
<script>

import axios from 'axios';
export default {
    name: 'empleos',
    data:() =>({
        datos: null,
        items: [],
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
        ],
        loading: true
    }),
    mounted(){
       
        this.mostrarEmpleo(this.$route.params.id_categoria);
    },
    methods:{
         mostrarEmpleo(id){
            axios.get('http://localhost/pempleos/empleo/listarc/' + id)
            .then(response=> {
         
              this.datos = response.data[0];
              console.log(this.datos);
                })
            .catch(err=>console.error(err)).finally(()=> this.loading=false);
        }
    }

}
</script>
