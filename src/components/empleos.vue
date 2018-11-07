<template>

<div  class="text-xs-center" v-if="loading"><v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
    
    </div>
    
   <v-container v-else class=" mt-5">
        <div class="text-xs-left">
    <v-btn fab dark small color="primary" @click="$router.go(-1)">
      <v-icon dark>arrow_back</v-icon>
    </v-btn>
             </div>
         <v-alert
      v-model="alert"
      dismissible
      type="error"
    >Tiene que estar logueado para postularse</v-alert>
       <h2 class="display-3 cyan--text">Puesto de trabajo <span class="error--text">Disponible</span></h2>
       <v-layout >
           <v-flex xs9>
              <h1 class="text-uppercase display-3 mt-5">{{datos.compañia}}</h1>
                <h4 class="subheading display-5 text-uppercase">{{datos.ubicacion}}</h4>
                 <v-divider class="mt-3"></v-divider>
              <h3 class="cyan--text text-uppercase py-3" >{{datos.posicion}} - {{datos.tipo}}</h3>
              <v-divider class="mb-5"></v-divider>
         
                  <p class="my-5 pt-4 body-2" >{{datos.descripcion}}</p>
             <br><br>
              <v-layout align-content-end column>
                  <strong >Como Aplicar? </strong> Envia un resumen de tu potencial a la pagina: <a :href="datos.url">{{datos.url}}</a>   
              </v-layout>
           </v-flex>
             
           <v-flex xs3>
             
               <div v-if="datos.logo!=null">
                     <v-img
                  :src="datos.logo"
                  :lazy-src="datos.logo"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                     </v-img>
               </div>
                 <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  v-else
                >

                     </v-img>
                     <div v-if="this.$session.get('tipo') == 'user' ||this.$session.get('tipo') == undefined  "> 
                         <div v-if="!postul">
                             <v-btn depresed block color="teal" class="text-xs-center" @click="postularse">postularse
                             </v-btn>
                             </div> 
                             <div v-else>
                                  <v-btn depresed block color="red" class="text-xs-center" @click="despostularse">despostularse
                             </v-btn>
                             </div>
                             </div>
           </v-flex>
       </v-layout>
   </v-container>
</template>
<script>

import axios from 'axios';
export default {
    name: 'empleos',
    data:() =>({
        datos: null,
        loading: true,
        postul: false,
        alert: false,
        idpostul: null
    }),
    mounted(){
       
        this.mostrarEmpleo(this.$route.params.id);
        if(this.$session.exists()){
            this.getpostul(this.$session.get('id'), this.$route.params.id);
        }else{
          
        }
    },
    methods:{
         mostrarEmpleo(id){
            axios.get('http://localhost/pempleos/empleo/listarid/' + id)
            .then(response=> {
         
              this.datos = response.data[0];
              console.log(this.datos);
                })
            .catch(err=>console.error(err)).finally(()=> this.loading=false);
        },
        getpostul(idusuario, idempleo){
              axios.get('http://localhost/pempleos/empleo/getpostul/' + idusuario + '/' + idempleo)
            .then(response=> {
                console.log(response.data);
                    if (response.data[0].idpostul != undefined) {
                    this.idpostul = response.data[0].idpostul
                    this.postul = true;
                    }else{
                        this.postul = false;    
                    }
                })
            .catch(err=>console.error(err)).finally(()=> this.loading=false);
        },
        postularse(){
           if (this.$session.exists()) {
                axios.post('http://localhost/pempleos/empleo/postularse',{
                idUsuario: this.$session.get('id'),
                idempleo: this.$route.params.id
            }).then(res=>{
                console.log(res.data);
                this.postul = true;
                this.getpostul(this.$session.get('id'), this.$route.params.id);
            }).catch(err=>console.log(err));
           }else{
               this.alert = true;
           }
        },
        despostularse(){
            axios.delete('http://localhost/pempleos/empleo/despostularse/' + this.idpostul).then(res=>{
                console.log(res.data[0]);
                this.postul = true;
                this.getpostul(this.$session.get('id'), this.$route.params.id);
            })
        }
    }

}
</script>
