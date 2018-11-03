<template>
    <v-container>
        {{datos}}
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    data: () => ({
        datos: null
    }),
    mounted(){
        this.mostrarEmpleos();
    },
    methods: {
        mostrarEmpleos(){
            axios.get('http://localhost/pempleos/empleo/listar')
            .then(response=> {
                this.datos = response.data
                })
            .catch(err=>this.datos = err);
        }
    }
}
</script>
