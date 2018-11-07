<template>
    <v-layout justify-end>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn  flat small slot="activator">Login</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline text-md-center text-xs-center text-uppercase">Iniciar Sesion</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email" required v-model="user.email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Contraseña*" type="password" required v-model="user.contraseña"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
          <v-btn color="cyan"  @click.native="Login()">Iniciar Sesion</v-btn>
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
    constructor(email, contraseña){
        this.email = email;
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
        text: ''
    }),
    methods:{
        Login(){
              axios.post('http://localhost/pempleos/usuario/login', {
                contraseña: this.user.contraseña,
                email: this.user.email
            }).then(res =>{
              console.log(res.data[0]);
             if(res.data[0].Status){
              this.$session.start()
              this.$session.set('jwt', res.data[0].token)
              this.$session.set('nombre', res.data[0].nombre)
              this.$session.set('id', res.data[0].id)
              this.$cookies.set('email', this.user.email)
              if(res.data[0].tipo == 0){
                this.$session.set('tipo', 'Admin')
              this.$router.push('/dashboard')
              }else if (res.data[0].tipo == 1) {
                this.$session.set('tipo', 'user')
             location.reload(); 
                 this.dialog =false;
              }else if (res.data[0].tipo == 2) {
                this.$session.set('tipo', 'poster')
              location.reload();
                 this.dialog =false;
              }

             }else{
               this.text = 'Tus datos son incorrectos, revisa tu email o  contraseña';
              this.snackbar = true;
             }
            }).catch(err=>console.error(err));
            
        }
    }
  }
</script>