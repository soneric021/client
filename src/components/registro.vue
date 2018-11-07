<template>
  <v-layout justify-end>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn  flat small slot="activator">Registro</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline text-md-center text-xs-center text-uppercase">Registrar Perfil de Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Nombre Completo*" required v-model="user.nombre"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required v-model="user.email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Contraseña*" type="password" required v-model="user.contraseña"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :items="['Poster', 'User']"
                  label="Tipo*"
                  required
                  v-model="user.tipo"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="registrar()">Registrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import axios from 'axios';

class usuario {
    constructor(nombre, email, tipo, contraseña){
        this.nombre = nombre;
        this.email = email;
        this.tipo = tipo;
        this.contraseña = contraseña;
    }
}
  export default {
    name: 'registro',
    data: () => ({
      dialog: false,
      user: new usuario(),
       snackbar: false,
        y: 'bottom',
        x: null,
        mode: '',
        timeout: 6000,
        text: 'Te haz registrado Exitosamente'
    }),
    methods:{
        registrar(){
            this.user.tipo = "user" ? 1:2;
            axios.post('http://localhost/pempleos/usuario/registro', {
                nombre: this.user.nombre,
                contraseña: this.user.contraseña,
                email: this.user.email,
                tipo: this.user.tipo
            }).then(res =>{
              if(res.data[0].Status){
                this.dialog = false;
                this.snackbar = true;
              }
            }).catch(err=>console.error(err));
            
        }
    }
  }
</script>