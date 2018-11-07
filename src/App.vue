<template>
  <v-app dark>
    <v-toolbar app  color="primary"
    dark>
      <v-toolbar-title class="headline text-uppercase">
        <span @click="$router.push('/')" class="logo">Portal de Empleos</span>
     
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!this.$session.exists()">
      <v-btn flat><login></login></v-btn>
      <v-btn flat><registro></registro></v-btn>
    </v-toolbar-items>
        <v-toolbar-items v-else>
          <v-btn flat v-if="this.$session.get('tipo') == 'poster'">
           <span @click="$router.push({name:'posts'})">postear Trabajo</span>
          </v-btn>
          <v-btn flat v-else-if="this.$session.get('tipo') == 'user'"> 
            Mis postulaciones
          </v-btn>
           <v-btn flat v-else-if="this.$session.get('tipo ') == 'admin'"> 
            Mis postulaciones
          </v-btn>
         <v-btn flat><logueado></logueado></v-btn>
        </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import registro from './components/registro.vue';
import login from './components/login.vue';
import logueado from './components/logueado.vue';

export default {
  name: 'App',
  components: {registro, login, logueado},
  data () {
    return {
      //
    }
  },
  watch:{
    '$route' (to, from) {
                //on route change re run: onCreated
                this.onCreated();
            }
  }
}
</script>
<style>
.logo{
cursor: pointer;
}
</style>
