<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Edit Marca</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        color="black"
        v-model.trim="dato.nombre"
        class="text-uppercase"
        autofocus
        stack-label
        label="Marca"
        maxlength="20"
      />
    </q-card-section>

    <q-card-actions align="right" class="text-black">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Aceptar" :disable="disabledButton" @click="updateMarca()" />
    </q-card-actions>
  </q-card>
</template>

<script>
  import http from "../../../functions/http";
  import disabled from "../../../functions/disabled";

  export default {
    props: ["dato"],
    data() {
      return {
				  
			};
		},
		computed:{
		disabledButton: function(){
			return disabled.marca(this.dato)
		},
		methods:{
			updateMarca(){
				var ruta = "marca/update";
				var datos = {
					id: this.dato.id,
					nombre: this.dato.nombre.toUpperCase(),
					adminId: 1
				}
				http(ruta, datos, response => {
					if (!response.data.error) {
							this.$emit('click', false, this.dato.nombre)
						} else {
							this.$emit('click', true, response.data.mensaje)
						}
				}, e => {
						this.$emit('click',2, e.message)
				})
			}
		}
	},
  };
</script>