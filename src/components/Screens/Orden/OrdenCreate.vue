<template>
  <div class="q-pa-md row items-start q-gutter-md">
    
		<Cabecera 
			class="my-card"
			:dato="dato" 
			:selectTecnico="selectTecnico" 
			:listaTecnicos="listaTecnicos"    
			:fechaEntregaEstimada="fechaEntregaEstimada"
			:km="km"/> 
		
		<div class="row">
			<DatosMoto
				class="my-card col q-mr-md"
				:dato="dato"
				:ultimo="ultimo"
			/>
			<DatosPropietario
				class="my-card col"
				:persona="persona" 
			/> 
		</div> 

		<div class="row my-card">
			<ServiciosSolicitados
				class="my-card col q-mr-md"
				:servicio="servicio"
				:listaServicioTaller="listaServicioTaller"
				:teal="teal"
				
			/>
			<ServiciosSolicitados
				class="my-card col q-mr-md"
				:servicio="servicio"
				:listaServicioTaller="listaServicioTaller"
				:teal="teal"
				
			/> 
		</div> 
	
	</div>
</template>

<script>
import http from '../../../functions/http'
import Cabecera from './Crear/Cabecera'
import DatosMoto from './Crear/DatosMoto'
import DatosPropietario from './Crear/DatosPropietario'
import ServiciosSolicitados from './Crear/ServiciosSolicitados'
import Solicitudes from './Crear/Solicitudes'

export default {
	components:{
		Cabecera,
		DatosMoto,
		DatosPropietario,
		ServiciosSolicitados,
		Solicitudes
	},
	data(){
		return {
			servicio:{
				id: null,
				nombre: null
			},
			km:'',
			teal: true,
			listaServicioTaller:[],
			selectTecnico: {value:0, label: ""},
			listaTecnicos:[],
			fechaEntregaEstimada:'31/03/2200',
			persona:{
				nombre:'CARLOS ANDRES TAMAYO',
				direccion:'Calle 12 # 26-46',
				telefono: '3136817175'
			},
			dato:{
				placa:'AAAA',
				color:'ROJO',
				tipo_moto:{
					referencia:'T115',
					marca:{
						nombre:'YAMAHA'
					}
				},
				km_promedio: '50km/dia'
			},
			ultimo: 2500
    }
	},
	beforeMount() {
			this.$nextTick(() => {
				this.cargarDatos();
				this.cargarlistaTecnicos();
				this.listaServicioTaller = [
					{
            id: 1,
            nombre: "CAMBIO ACEITE TRANSMISION"
        },
        {
            id: 8,
            nombre: "CAMBIO BOMBILLO FAROLA"
        },
        {
            id: 3,
            nombre: "CAMBIO BUJIA"
        },
        {
            id: 4,
            nombre: "CAMBIO CORREA TRANSMISION"
        },
        {
            id: 2,
            nombre: "CAMBIO FILTRO ACEITE"
        },
				]
			});
		},
		methods:{
			cargarDatos(){

			},
			cargarlistaTecnicos(){
				var ruta ='persona/tecnicoMap'
				http(ruta, null, response => {
					this.listaTecnicos = response.data.datos
				}, e =>{

				})
			},
			selectedTecnico(){

			},

		}

	}

</script>

<style scoped>
	.fila {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}
	.my-card{
		width: 100%;
		/*border: 1px solid black;*/
	}
</style>
