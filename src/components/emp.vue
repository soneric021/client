<template>
     <div>
          <v-layout justify-end>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline text-md-center text-xs-center text-uppercase">Editar Empleo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Compañia"  v-model="works.compañia"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Ubicacion"  v-model="works.ubicacion"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="posicion*"  v-model="works.posicion"></v-text-field>
              </v-flex>
                 <v-flex xs12>
                <v-text-field label="tipo"  v-model="works.tipo"></v-text-field>
              </v-flex>
               <v-flex xs12>
                <v-text-field label="url"  v-model="works.url"></v-text-field>
              </v-flex>
               <v-textarea
          name="input-7-1"
          v-model="works.descripcion"
          label="Descripcion"
          value=""
          hint="Hint text"
          :counter="500"
        ></v-textarea>
            </v-layout>
            
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
          <v-btn color="purple darken-1"   @click.native="editarEmpleo(idEmpleo)">Editar Empleo<v-icon>edit</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          </v-layout>
         <template>         
  <v-data-table
    :headers="headers"
    :items="datos"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
        
        <td class="text-xs-center text-uppercase">{{ props.item.id_empleo }}</td>
        <td class="text-xs-left text-uppercase">{{ props.item.NombreCompleto }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.ubicacion }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.posicion }}</td>
      <td class="text-xs-left text-uppercase">{{ props.item.compañia }}</td>
      <td class="text-xs-center text-uppercase"><v-btn color="primary" @click="opendialog(props.item.id_empleo)">Editar<v-icon>edit</v-icon></v-btn> <v-btn color="error">Eliminar <v-icon dark>remove</v-icon></v-btn></td>  
      
    </template>
  </v-data-table>
  </template>

     </div>
</template>

<script>
import axios from 'axios';
class trabajo{
    constructor(compañia, tipo, url,posicion,ubicacion,descripcion){
        this.compañia = compañia;
        this.posicion = posicion;
        this.ubicacion = ubicacion;
        this.url = url;
        this.tipo = tipo;
        this.descripcion = descripcion;
      
    }
}
export default {
    name: 'emp',
    data: () =>({
        datos: [],
        dialog: false,
         works: new trabajo(),
         idEmpleo: null,
        headers: [
          {
            text: 'Trabajos',
            align: 'center',
            sortable: false,
            value: 'name'
          },
          { text: 'Usuario', value: 'Usuario' },
          { text: 'Ubicacion', value: 'Ubicacion' },
          { text: 'Posicion', value: 'Posicion' },
          { text: 'Compañia', value: 'Compañia' },
          { text: 'Acciones', value: 'Acciones' }
        ],
    }),
    mounted(){
        this.mostrarEmpleos();
    },
    methods: {
         mostrarEmpleos(){
            axios.get('http://localhost/pempleos/empleo/listar')
            .then(response=> {
                this.datos=[];
              for(let i = 0; i<response.data[0].length; i++){
                   this.datos.push(response.data[0][i]);
               }
               console.log(response.data[0]);
                })
            .catch(err=>console.error(err));
        },
        eliminarEmpleo(id){
            axios.delete('http://localhost/pempleos/empleo/delete/' + id)
            .then(res => res.data[0])
            .catch(err=>console.log(err));
        },
        editarEmpleo(id){
            axios.post('http://localhost/pempleos/empleo/edit/' + id, {
            compañia: this.works.compañia,
            tipo: this.works.tipo,
            url: this.works.url,
            posicion: this.works.posicion,
            ubicacion: this.works.ubicacion,
            descripcion: this.works.descripcion,
          }).then(res=>{
            if(res.data[0].Status){
                
            }
          }).catch(err=>console.log(err));
        },
        opendialog(id){
            axios.get('http://localhost/pempleos/empleo/listarid/' + id).then(res => {
                this.works = new trabajo(res.data[0].compañia, res.data[0].tipo, res.data[0].url, res.data[0].posicion,
                res.data[0].ubicacion, res.data[0].descripcion);
                this.dialog = true;
                this.idEmpleo = res.data[0].id_empleo;
                this.mostrarEmpleos();
            }).catch(err=>console.log(err));
        }
    }
}
</script>

<style>

</style>
