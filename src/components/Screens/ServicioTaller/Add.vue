<template>
  <q-card style="min-width: 350px">
		<q-card-section>
			<div class="text-h6">Create Servicios Taller</div>
		</q-card-section>
		<q-card-section class="q-pt-none">
					<q-input
						color="black"
						v-model.trim="dato.nombre"
						class="text-uppercase"
						autofocus
						stack-label
						label="Servicio Taller"
						maxlength="20"
					/>
				</q-card-section>
				<q-card-actions align="right" class="text-black">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Aceptar" :disable="disabledButton"  @click="createServicioTaller" />
				</q-card-actions>
			</q-card>
</template>

<script>

import http from "../../../functions/http";
import disabled from "../../../functions/disabled";

export default {
	props: ['dato'],
	data(){
		return{
			
		}
	},
	computed:{
		disabledButton: function(){
				return disabled.servicioTaller(this.dato)
		}
	},
	methods:{
		createServicioTaller() {
				var ruta = "servicioTaller/create";
				var datos = {
					id: this.dato.id,
					nombre: this.dato.nombre.toUpperCase(),
					adminId: 1
				}
				http(ruta, datos, response => {
					if (!response.data.error) {
							this.$emit('click',false, response.data.datos.nombre)
						} else {
							this.$emit('click',true , response.data.mensaje)
						}
				}, e =>{
						this.$emit('click',2, e.message)
				})
		},
	}
}
</script>