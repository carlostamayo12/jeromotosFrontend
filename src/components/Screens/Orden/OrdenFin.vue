<template>
	<div>	
	<!--Columna 1-->
		<div class="float-left">
			<q-card style="max-width: 400px" class="q-mt-lg">
				<p class="bg-black text-white q-py-xs q-pl-md q-mb-none rounded-borders">Orden# 00001</p>
				<q-card-section class="row">
					<q-input
						readonly
						color="black"
						dense
						v-model.trim="dato.placa"
						class="text-uppercase q-mr-md col"
						autofocus
						stack-label
						label="Placa"
						style="max-width:65px"
					/>
					<q-btn round icon="search" color="red" size="xs" @click="dialogPlaca = true" />

					<q-select
						@input="selectedTecnico"
						label="Tecnico"
						color="black"
						dense
						class="text-uppercase q-mx-md col"
						v-model="selectTecnico"
						:options="listaTecnicos"
						style="padding: 0"
					/>
				</q-card-section>
				<q-card-section class="row">
					<q-input
						readonly
						color="black"
						dense
						v-model.trim="fechaEntregaEstimada"
						class="text-uppercase q-mr-none col"
						autofocus
						stack-label
						label="Fecha Entrega"
						style="max-width:150px"
					/>
					<q-btn round icon="timer" color="red" size="xs" />
					<q-input
						color="black"
						dense
						v-model.trim="km"
						class="text-uppercase q-mx-lg col"
						autofocus
						stack-label
						label="Kilometraje"
						
					/>
					
				</q-card-section>
			<q-card-actions align="center" class="text-black">
					<q-btn style="width:150px" label="Aceptar" color="red" />
				</q-card-actions>
			</q-card>

			<q-card style="max-width: 400px" class="q-mt-lg">
				<p class="bg-black text-white q-py-xs q-pl-md q-mb-none rounded-borders">Informacion Motocicleta</p>

				<q-card-section class="row">
					<q-input
						readonly
						color="black"
						dense
						v-model.trim="dato.placa"
						class="text-uppercase q-mr-md col"
						autofocus
						stack-label
						label="Placa"
						style="max-width:80px"
					/>

					<q-input
						readonly
						dense
						v-model="dato.km_promedio"
						color="black"
						class="text-uppercase col q-mr-md"
						stack-label
						label="Km promedio"
						style="max-width:100px"
					/>

					<q-input
						readonly
						dense
						v-model="ultimo"
						color="black"
						class="text-uppercase col"
						stack-label
						label="Ultimo Km"
					/>
				</q-card-section>

				<q-card-section class="q-pt-none row">
					<q-input
						readonly
						dense
						v-model="dato.color"
						color="black"
						class="text-uppercase col q-mr-md"
						stack-label
						label="Color"
						style="max-width:100px"
					/>

					<q-input
						readonly
						color="black"
						dense
						v-model.trim="dato.tipo_moto.referencia"
						class="text-uppercase q-mr-md col"
						autofocus
						stack-label
						label="Referencia"
					/>

					<q-input
						readonly
						dense
						v-model="dato.tipo_moto.marca.nombre"
						color="black"
						class="text-uppercase col"
						stack-label
						label="Marca"
					/>
				</q-card-section>

				<q-card-section>
					<q-input
						readonly
						dense
						v-model.trim="persona.nombre"
						color="black"
						class="text-uppercase"
						stack-label
						label="Propietario"
					/>
				</q-card-section>

				<q-card-section class="q-pt-none row">
					<q-input
						style="max-width:100px"
						readonly
						color="black"
						dense
						v-model.trim="persona.telefono"
						class="text-uppercase q-mr-md col"
						autofocus
						stack-label
						label="Telefono"
					/>
					<q-input
						readonly
						dense
						v-model="persona.direccion"
						color="black"
						class="col"
						stack-label
						label="Direccion"
					/>
				</q-card-section>
			</q-card>
		</div>

		<!--Columna 2-->
		<div class="float-left q-mx-md" >
			<q-card class="q-mt-lg">
				<q-list bordered style="max-width:580px;">
					<p class="bg-black text-white q-py-xs q-pl-md q-mb-none rounded-borders">Servicios Taller </p>
					<q-item class="q-my-none" v-for="(servicio,i) in listaServicioTaller" :key="i" clickable v-ripple style="margin: 10px 16px;">
						<q-item-section >
							<q-item-label>{{servicio.nombre}}</q-item-label>
						</q-item-section>
						<q-item-section side>
							<q-checkbox v-model="teal" color="black" />
						</q-item-section>
					</q-item>
				</q-list>
			</q-card>
		</div>

		<!--Columna 3-->
		<div class="float-left q-mx-md">
			<q-card style="min-width: 500px" class="q-mt-lg">
				<p class="bg-black text-white q-py-xs q-pl-md q-mb-none rounded-borders">Solicitudes</p>
				<q-card-section>
					<q-input
						dense
						type="text-area"
						color="black"
						v-model="solicitud"
						class="text-uppercase q-mr-md"
						autofocus
						stack-label
						label="Solicitud 1"
					/>
				</q-card-section>
				<q-card-section>
					<q-input
						dense
						type="text-area"
						color="black"
						v-model="solicitud"
						class="text-uppercase q-mr-md"
						autofocus
						stack-label
						label="Solicitud 2"
					/>
				</q-card-section>
				<q-card-section>
					<q-input
						type="text-area"
						color="black"
						v-model="solicitud"
						class="text-uppercase q-mr-md"
						autofocus
						stack-label
						label="Solicitud 3"
					/>
				</q-card-section>
			</q-card>
		</div>
		
		<!--Dialog Placa-->
		<q-dialog v-model="dialogPlaca" @escape-key="dialogPlaca = false">
			
			<q-card style="min-width: 350px">
				<q-card-section>
					<div class="text-h6">Crear Marca</div>
				</q-card-section>
				<q-card-section class="q-pt-none">
					<q-input
						color="black"
						v-model.trim="placa"
						class="text-uppercase"
						autofocus
						stack-label
						label="Placa"
						maxlength="6"
					/>
				</q-card-section>

				<q-card-actions align="right" class="text-black">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Aceptar" @click="findPlaca" />
				</q-card-actions>
			</q-card>
		</q-dialog>
	
	</div>
</template>

<script>
	import http from "../../../functions/http";
	export default {
		data() {
			return {
				dialogPlaca: false,
				placa:"",
				selectTecnico: {value:0, label: ""},
				listaTecnicos:[],
				solicitud: "",
				teal: true,
				km: 2000,
				listaServicioTaller:[],
				servicio:{
					id:0,
					nombre:""
				},
				text: "Observaciones",
				fechaEntregaEstimada: "25/05/20 03:00 pm",
				ultimo: "2500",
				persona: {
					id: 0,
					nombre: "Carlos Andres Tamayo Benjumea",
					telefono: "3136817175",
					direccion: "Calle 12 # 26-46 Aguachica Cesar"
				},

				dato: {
					id: 1,
					placa: "AAA11",
					color: "AZUL",
					km_promedio: "50.00",
					tipo_motoId: 1,
					propietarioId: 1,
					tipo_moto: {
						referencia: "T115",
						marca: {
							nombre: "YAMAHA"
						}
					}
				},
				text: "",
				selectActivity: { value: 0, label: "Nueva Orden" },
				listActivity: [
					{ value: 0, label: "Nueva Orden" },
					{ value: 1, label: "Finalizar Orden" },
					{ value: 2, label: "Administrador" }
				]
			};
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
		methods: {
			selectedActivity(activity) {
				this.selectActivity = JSON.parse(JSON.stringify(activity));
			},
			cargarlistaTecnicos(){
				var ruta ='30/persona/tecnicoMap'
				http(ruta, null, response => {
					this.listaTecnicos = response.data.datos
				}, e =>{

				})
			},
			selectedTecnico(){

			},
			cargarDatos() {
				var ruta = 'moto/findOneByPlacaNew'
				var datos = { placa: this.placa }
				http(ruta, datos, response =>{
					if (response.data.datos !== null) {
						if(response.data.datos.ordenEntradas.length){
							console.log('la moto esta en el taller')
						}else{
							this.dato = response.data.datos
						}
					}else{
						console.log('No se encontro la motocicleta')
					}
					
					//console.log(response.data.datos)
				}, e=>{
					console.log(e.toString)
				})
			},
		}
	};
</script>

<style scoped>
	.fila {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	.inputBox {
		width: 100%;
		padding: 10px 0;
		font-size: 16px;
		letter-spacing: 1px;
		color: #fff;
		margin-bottom: 30px;
		border: none;
		border-bottom: 1px solid #fff;
		outline: none;
		background: transparent;
	}
</style>

