<template>
  <q-card style="min-width: 600px">
    <q-card-section class="q-py-xs">
      <div class="text-h6">Tabla Mantenimiento</div>
			<div class="text-h6">{{tipo.referencia}}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-list dense>
        <q-item>
          <q-item-section class="col">
            <q-item-label dense header class="q-px-none">Servicio taller</q-item-label>
          </q-item-section>
          <q-item-section class="col-2">
            <q-item-label dense header class="q-px-none">Kilometraje</q-item-label>
          </q-item-section>
          <q-item-section class="col-2">
            <q-item-label dense header class="q-px-none">meses</q-item-label>
          </q-item-section>
        </q-item>

        <q-item dense v-for="(dato,i) in datos" :key="i">
          <q-item-section class="col">
            <q-item-label dense>{{dato.servicioTaller.nombre}}</q-item-label>
          </q-item-section>

          <q-item-section class="col-2">
            <q-select
              class="q-py-none"
							color="black"
              dense
              v-model="dato.kilometraje"
              :options="listaKilometraje"
              style="padding: 0px !important;"
            />
          </q-item-section>

          <q-item-section class="col-2">
            <q-select color="black" dense v-model="dato.tiempo" :options="listaTiempo" style="padding: 0" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
		<q-card-actions align="right" class="text-black">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Aceptar" :disable="disabledButton" @click="updateTabla" />
    </q-card-actions>
  </q-card>


</template>

<script>
	import http from '../../../functions/http'
	import listar from '../../../functions/listar'
	import mapping from '../../../functions/mapping'
	import Error from '../Error'
	
	export default {
    props: ["tipo"],
    data() {
      return {
				listaKilometraje:null,
				listaTiempo: [],
				listaEnvio: [],
				datos:[],
				dato: {
          id: 0,
					kilometraje: {value: 0, label: '0'},
          tiempo: {value: 0, label: '0'},
          estado: false,
          tipo_motoId: 1,
          servicioId: null,
          servicioTaller: {
            id: null,
            nombre: null
					},
					adminId:1
        }
      }
		},
		beforeMount() {
			this.$nextTick(() => {
				this.cargarDatos()
				this.listaKilometraje = listar.kilometraje()
				this.listaTiempo = listar.tiempo()
			});
		},
		computed: {
			disabledButton: function() {
        return false;
      }
		},
		methods: {
			updateTabla(){
				let data = mapping.tablaEnvio(this.datos, 1)
				let i = 0
				data.forEach(item => {
					console.log(item)
					let ruta = 'tablamantenimiento/update'
					if(i < data.length){
						http(ruta, item, response =>{
							console.log(i)	
						}, e => {

						})
					}else{

					}
					i++
				})
				
				this.listaEnvio = mapping.tablaEnvio(this.datos, 1)
			},
			cargarDatos(){
				var ruta = "tablamantenimiento/findByTipoAll"
				var datos = {tipoMoto: this.tipo.id}
				http(ruta, datos, response => {
					this.datos = mapping.tablaEdit(response.data.datos)
				}, e => {
					console.log(e.message)
				})
			}
		}
  };
</script>