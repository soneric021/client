<template>
    <v-container>
        <template>
    <searchbar :items="items"></searchbar>
</template>
        <div  class="text-xs-center" v-if="loading"><v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular></div>
        <div  class="test-xs-center" :key="c.id_categoria" v-for="c in category" v-else>
             <v-card-text color="indigo">
               
      <h1 class="display-2 text-md-center text-uppercase cyan--text lighten"  
      @click="$router.push({name: 'empleosc', params: { id_categoria: c.id_categoria }})" id="heads">
        {{c.nombre}}
             </h1>
       <v-divider></v-divider>
     
    </v-card-text>
   <template>         
  <v-data-table
    :headers="headers"
    :items="datos"
    hide-actions
    class="elevation-1"
    v-if="datos.length > 0"
  >
    <template slot="items" slot-scope="props"  v-if="c.id_categoria == props.item.id_categoria">
        
        <td class="text-xs-center text-uppercase">{{ props.item.id_empleo }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.ubicacion }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.posicion }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.compañia }}</td>
      <td class="text-xs-left text-uppercase"><router-link class="red--text" :to="{ name: 'empleos', params: { id: props.item.id_empleo }}">Ver completo</router-link></td>
      
    </template>
  </v-data-table>
  </template>
        </div>
    </v-container>
    
</template>
<script>
import axios from 'axios';
import searchbar from './searchbar.vue';

export default {
    components: {
        searchbar
    },
    data: () => ({
        loading:true,
        datos: [],
        items: [],
        removed: [],
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
        category:[]
    }),
    mounted(){
        this.mostrarCategorias();
    },
    methods: {
        mostrarEmpleos(idcategoria){
         
            axios.get('http://localhost/pempleos/empleo/listarc/' + idcategoria)
            .then(response=> {
             
              
              for(let i = 0; i<response.data[0].length; i++){
                      
                         this.datos.push(response.data[0][i]);  
                        
                  
               }
          
                })
            .catch(err=>console.error(err));
        },
        mostrarCategorias(){
            axios.get('http://localhost/pempleos/categoria/listar').then(response=> {
                for(let i = 0; i<response.data[0].length; i++){
    
                        this.category.push(response.data[0][i]);
                  
                    
                    this.mostrarEmpleos(response.data[0][i].id_categoria);
                    this.items.push(response.data[0][i].nombre);
                   //console.log(this.category.length);
                }
            }).catch(err=>console.error(err)).finally(()=>{this.loading=false});
        }
    }
}

</script>
<style>
#heads{
    cursor: pointer;
    opacity: 0.8;
}
#heads:hover{
       opacity: 1;
}
</style>
