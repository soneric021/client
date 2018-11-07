<template>
    <div class="text-xs-center">
    <v-menu offset-y>
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
       <v-icon dark>person </v-icon> {{ this.$session.get('nombre')}} 
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click="acciones(item.id)"
        >
          <v-list-tile-title  @click="acciones(items.id)">{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
    name: 'logueado',
    data: () => ({
      items: [
        {id:1,  title: 'Perfil de usuario' },
        {id:2, title: 'Cerrar sesion' }
      ]
    }),
    methods:{
        acciones(id){
            if(id ==1){
              this.$routes.push('/perfil');
            }else if(id ==2){
                 this.logout(); 
            }
        },
        logout: function () {
      this.$session.destroy()
      this.$cookies.remove('email')
      this.$router.push('/')
      location.reload();
    }
    }
}
</script>
