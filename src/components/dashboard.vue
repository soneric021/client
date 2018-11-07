<template>
<div>
 
     <div class="text-xs-left">
    <v-btn fab dark small color="primary" @click="$router.go(-1)">
      <v-icon dark>arrow_back</v-icon>
    </v-btn>
             </div>
   <h1 class="display-4 text-xs-center text-uppercase">Dashboard</h1>

    <v-container>
        <v-layout column justify-end>
            <h1 class="text-xs-center primary">Categorias</h1>
     <cat></cat>
        </v-layout>
        <v-divider></v-divider>
        <v-layout column>
            <h1 class="text-xs-center my-3 cyan">Empleos</h1>
            <emp></emp>
        </v-layout>
       
    </v-container>
</div>
</template>
<script>
import cat from './cat.vue';
import emp from './emp.vue';

export default {
    name: 'dashboard',
    components: {
        cat,
        emp
    },
    data:() => ({
      
    })
}
</script>
