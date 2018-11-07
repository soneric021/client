<template>
   <v-container>
      <div class="text-xs-left">
    <v-btn fab dark small color="primary" @click="$router.go(-1)">
      <v-icon dark>arrow_back</v-icon>
    </v-btn>
             </div>
       <v-layout xs8 md8 column>
           <h2 class="display-3 text-xs-center">Postear Trabajo</h2>
       <v-divider></v-divider>
       <!-- Imagenes -->
       <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageUrl" height="150" v-if="imageUrl"/>
					<v-text-field label="Imagen de logo" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>
				</v-flex>

       <v-form ref="form" v-model="valid" lazy-validation>
            <v-select
      v-model="works.id_categoria"
      :items="items"
      item-value="value"
      :rules="[v => !!v || 'Item is required']"
      label="Categorias"
      required
    ></v-select>
    <v-text-field
      v-model="works.compañia"
      :rules="nameRules"
      label="Compañia"
      required
    ></v-text-field>
   <v-radio-group row v-model="works.tipo">
      <v-radio
        v-for="n in ['Part-Time', 'Full-Time', 'Freelance']"
        :key="n"
        :label="`${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
    
     <v-text-field
      v-model="works.url"
      :rules="nameRules"
      label="url"
    ></v-text-field>
    <v-text-field
      v-model="works.posicion"
      label="Posicion"
      required
    ></v-text-field>
    <v-text-field
      v-model="works.ubicacion"
      label="ubicacion"
      required
    ></v-text-field>
    <v-textarea
          name="input-7-1"
          v-model="works.descripcion"
          label="Descripcion"
          value=""
          hint="Hint text"
          :counter="500"
        ></v-textarea>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
       </v-layout>
   </v-container>
</template>
<script>
import axios from 'axios';
class trabajo{
    constructor(compañia, logo, posicion, id_categoria, ubicacion, url, tipo,descripcion){
        this.compañia = compañia;
        this.logo = logo;
        this.posicion = posicion;
        this.id_categoria = id_categoria;
        this.ubicacion = ubicacion;
        this.url = url;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
}
export default {
    name: 'posts',
    data: () => ({
         title: "Image Upload",
        dialog: false,
        works: new trabajo(),
    imageName: '',
    logoimg: null,
    imageUrl: '',
    formdata: {},
	    imageFile: '',
      valid: true,
      radioGroup: 1,
      name: '',
      nameRules: [
        v => !!v || 'este campo es obligatorio',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      items: [],
      checkbox: false
    }),
    created(){
        this.mostrarCategorias();
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          console.log(this.works);
          axios.post('http://localhost/pempleos/empleo/create', {
            compañia: this.works.compañia,
            tipo: this.works.tipo,
            logo: this.logoimg,
            url: this.works.url,
            posicion: this.works.posicion,
            ubicacion: this.works.ubicacion,
            id_categoria: this.works.id_categoria,
            descripcion: this.works.descripcion,
            email: this.$cookies.get('email'),
            idUsuario: this.$session.get('id')
          }).then(res=>{
            if(res.data[0].Status){
              this.$router.push('/');
            }
          }).catch(err=>console.log(err));
        }
      },
      clear () {
        this.$refs.form.reset()
      },
      mostrarCategorias(){
            axios.get('http://localhost/pempleos/categoria/listar').then(response=> {
              for(let i = 0;i<response.data[0].length;i++){
                console.log(response.data[0][i]);
                  this.items.push({value:response.data[0][i].id_categoria, text: response.data[0][i].nombre});
              }
            }).catch(err=>console.error(err));
        },
      pickFile () {
            this.$refs.image.click()
    },
    	onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
                    this.imageFile = files[0] // this is an image file that can be sent to server...       
                   this.formdata = new FormData();
                   this.formdata.append('file', this.imageFile);
          axios.post('http://localhost/pempleos/image/do_upload',this.formdata)
          .then(res=> {
            this.logoimg = res.data[0].image
        })
          .catch(err=> console.log(err));
      
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
    }
    
}
</script>
