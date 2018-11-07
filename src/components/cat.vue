<template>
    <div>
    
         <div  class="text-xs-center" v-if="loading"><v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular></div>
        <div v-else>
            <v-layout row v-if="edit === false">
                 <v-text-field label="Nombre"  v-model="nombreC"></v-text-field> 
                 <v-btn  color="success" @click="crearCategoria()">Agregar Categoria <v-icon dark>add</v-icon></v-btn>
           </v-layout>
           <v-layout row v-else>
                 <v-text-field label="Nombre"  v-model="nombreC"></v-text-field> 
                 <v-btn   color="purple" @click="crearCategoria()">Editar Categoria<v-icon>edit</v-icon></v-btn>
           </v-layout>
              <template>         
  <v-data-table
    :headers="headers"
    :items="category"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
        
        <td class="text-xs-center text-uppercase">{{ props.item.id_categoria }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.nombre }}</td>
       <td class="text-xs-center text-uppercase"><v-btn color="primary" @click="editarCategoria(props.item.id_categoria)">Editar<v-icon>edit</v-icon></v-btn> <v-btn color="error">Eliminar <v-icon dark>remove</v-icon></v-btn></td>  

      
    </template>
  </v-data-table>
  </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
     name: 'cat',
    data: ()=>({
        loading: true,
        category: [],
        nombreC: '',
        idcategoria: null,
        edit: false,
        idcat: null,
         headers: [
          {
            text: 'Trabajos',
            align: 'center',
            sortable: false,
            value: 'name'
          },
          { text: 'Nombre', value: 'Nombre' },
          { text: 'Acciones', value: 'Acciones' }
        ],
    }),
    mounted(){
        this.mostrarCategorias();
    },
    methods:{
           mostrarCategorias(){
            axios.get('http://localhost/pempleos/categoria/listar').then(response=> {
                this.category = [];
                for(let i = 0; i<response.data[0].length; i++){
                    this.category.push(response.data[0][i]);
                }
            }).catch(err=>console.error(err)).finally(()=>{this.loading=false});
        },
        crearCategoria(){
            if(this.edit == false){
                axios.post('http://localhost/pempleos/categoria/create', {
                nombre: this.nombreC,
                id_usuario: this.$session.get('id')
            }).then(res=> {
                console.log(res.data)
                this.loading = true;
                this.mostrarCategorias();
                }).catch(err=> console.log(err)).finally(()=>{this.loading=false});;
            }else{
                 axios.put('http://localhost/pempleos/categoria/edit/' + this.idcategoria, {
                nombre: this.nombreC
            }).then(res=> {
                console.log(res.data)
                this.loading = true;
                this.edit = false;
                this.nombreC = '';
                this.mostrarCategorias();
                }).catch(err=> console.log(err)).finally(()=>{this.loading=false});;
            }
        }, 
        eliminarCategoria(id){
            //axios.delete('http://localhost/pempleos/categoria/create' + id).then(res=> console.log(res.data))
        },
        editarCategoria(id){
           axios.get('http://localhost/pempleos/categoria/listarid/' + id).then(res=>{
               this.nombreC = res.data[0].nombre;
               this.idcategoria = res.data[0].id_categoria;
               this.edit = true;
           }).catch(error=> console.log(error));
        }
    }
}
</script>

<style>

</style>
