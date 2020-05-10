<template>
  <div class="q-pa-md row items-start q-gutter-md">
    
		<Cabecera 
			class="my-card"
			:dato="dato" 
			:selectTecnico="selectTencico" 
			:listaTecnicos="listaTecnicos"    
			:fechaEntregaEstimada="fechaEntregaEstimada"/> 
		
		<div class="row">
			<DatosMoto
				class="my-card col q-mr-md"
				:dato="dato"
				:ultimo="ultimo"
			/>
			
			<DatosPersona
				class="my-card col"
				:persona="persona" 

			/> 
		
		</div> 
		

    <q-card class="my-card">
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-actions vertical align="center">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import http from '../../../functions/http'
import Cabecera from './Crear/Cabecera'
import DatosMoto from './Crear/DatosMoto'
import DatosPersona from './Crear/DatosPersona'
export default {
	components:{
		Cabecera,
		DatosMoto,
		DatosPersona
	},
	data(){
		return {
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
		border-style: solid;
  	border-color: black;
	}
</style>
