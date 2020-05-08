
 <template>
	<!--<q-page>-->

	<div class="q-pa-md fila" style="max-width: 580px; margin-top:80px;">
		<q-toolbar class="bg-red text-white rounded-borders">
			<q-toolbar-title>Motocicleta</q-toolbar-title>
			<q-space />
			<q-input dark dense standout v-model="text" input-class="text-left" class="q-ml-md">
				<template v-slot:append>
					<q-icon v-if="text === ''" name="search" />
					<q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
				</template>
			</q-input>
			<q-btn @click="addMoto" dense class="glossy q-ml-md" round color="grey-9" icon="add" />
		</q-toolbar>
		
		<q-list bordered style="max-width:580px;height: 330px;">
			<q-item v-for="(dato,i) in listarMotos" :key="i" clickable v-ripple style="margin: 10px 16px;">
				<q-item-section avatar>
					<q-icon name="motorcycle" style="font-size:30px;" color="grey-9" />
				</q-item-section>
				<q-item-section>
					<q-item-label class="text-bold">{{dato.placa}}</q-item-label>
					<q-item-label caption>{{dato.tipo_moto.marca.nombre}}    {{dato.tipo_moto.referencia}}</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-icon @click.native="editMoto(dato)" name="edit" color="grey-9" />
				</q-item-section>
				<q-item-section side>
					<q-icon name="info" @click.native="viewMoto(dato)" color="grey-9" />
				</q-item-section>
			</q-item>
		</q-list>

		<div class="flex fila q-mt-xl" style="max-width:350px;" v-if="listarMotos.length > 0">
			<q-pagination
				boundary-links
				style="margin:auto"
				v-model="page"
				:min="minPages"
				:max="numberPages"
				:max-pages="3"
				color="black"
			/>
		</div>
		<!--</div>-->

		<!-- Dialog Add -->
		<q-dialog v-model="dialogAdd" @escape-key="dialogAdd = false">
			<q-card style="min-width: 450px" class="q-px-md">
				<q-card-section>
					<div class="text-h6">Crear Moto</div>
				</q-card-section>
				<q-card-section class="q-pt-none">
					<q-input
						color="black"
						dense
						v-model.trim="dato.placa"
						class="text-uppercase"
						autofocus
						stack-label
						label="Placa"
					
					/>
					<q-input
						dense
						v-model="dato.color"
						color="black"
						class="text-uppercase"
						stack-label
						label="Color"
					/>
					<q-select
						@input="selectedMarca"
						label="MARCA"
						class
						color="black"
						dense
						v-model="selectMarca"
						:options="listaMarcas"
						style="padding: 0"
					/>
					<q-select
						label="REFERENCIA"
						class
						color="black"
						dense
						v-model="selectTipo"
						:options="listarTipos"
						style="padding: 0"
					/>
					<q-input
						dense
						v-model.trim="persona.nombre"
						color="black"
						class="text-uppercase"
						stack-label
						label="Propietario"
						@input="inputPersona"
					/>
					<q-list dense>
						<q-item
							v-for="(persona,i) in listarPersonas"
							:key="i"
							clickable
							v-ripple
							style="margin: 10px 16px;"
							@click="propietario(persona)"
						>
							<q-item-section>
								<q-item-label caption>{{persona.nombre}}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>

				<q-card-actions align="right" class="text-black">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Aceptar" :disable="disabledButton" @click="createMoto" />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<!-- Dialog View -->
		<q-dialog v-model="dialogView" persistent>
			<q-card style="min-width: 350px">
				<q-card-section>
					<div class="text-h6">Motocicleta</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<q-input
						dense
						v-model="dato.placa"
						color="black"
						class="text-uppercase"
						readonly
						stack-label
						label="Placa"
					/>
					<q-input
						dense
						v-model="dato.color"
						color="black"
						class="text-uppercase"
						readonly
						stack-label
						label="Color"
					/>
					<q-input
						dense
						v-model="dato.tipo_moto.marca.nombre"
						color="black"
						class="text-uppercase"
						readonly
						stack-label
						label="Marca"
					/>
					<q-input
						dense
						v-model="dato.tipo_moto.referencia"
						color="black"
						class="text-uppercase"
						readonly
						stack-label
						label="Referencia"
					/>
					<q-input
						dense
						v-model="dato.km_promedio"
						color="black"
						class="text-uppercase"
						readonly
						stack-label
						label="Km Promedio"
					/>
					<q-input
						dense
						v-model="dato.persona.nombre"
						color="black"
						class="text-uppercase"
						readonly
						stack-label
						label="Propietario"
					/>
				</q-card-section>

				<q-card-actions align="right" class="text-black">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Aceptar" @click="dialogView = false" />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<!-- Dialog Edit -->
		<q-dialog v-model="dialogEdit" persistent>
			<q-card style="min-width: 350px">
				<q-card-section>
					<div class="text-h6">Motocicleta</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<q-input
						dense
						color="black"
						v-model.trim="dato.placa"
						class="q-my-md text-uppercase"
						autofocus
						stack-label
						label="Placa"
					/>
					<q-input
						dense
						color="black"
						v-model.trim="dato.color"
						class="q-my-md text-uppercase"
						autofocus
						stack-label
						label="Color"
					/>
					<q-select
						@input="selectedMarca"
						class="q-my-md"
						color="black"
						dense
						v-model="selectMarca"
						:options="listaMarcas"
						style="padding: 0"
					/>
					<q-select
						class="q-my-md"
						color="black"
						dense
						v-model="selectTipo"
						:options="listarTipos"
						style="padding: 0"
					/>
					<q-input
						dense
						v-model.trim="persona.nombre"
						color="black"
						class="q-my-md text-uppercase"
						stack-label
						label="Propietario"
						@input="inputPersona"
					/>
					<q-list dense>
						<q-item
							v-for="(persona,i) in listarPersonas"
							:key="i"
							clickable
							v-ripple
							style="margin: 10px 16px;"
							@click="propietario(persona)"
						>
							<q-item-section>
								<q-item-label caption>{{persona.nombre}}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>

				<q-card-actions align="right" class="text-black">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Aceptar" :disable="disabledButton" @click="updateMoto" />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<!-- Dialog Error -->
		<q-dialog v-model="dialogError">
			<q-card style="width: 300px">
				<q-card-section>
					<div class="text-h6">Small</div>
				</q-card-section>

				<q-card-section class="q-pt-none">{{error}}</q-card-section>

				<q-card-actions align="right" class="bg-white text-teal">
					<q-btn flat label="OK" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>

	<!--</q-page>-->
</template>-->

<script>
	//import http from "../funciones/http";
	import { mapActions, mapState } from "vuex";
	//import js from '../funciones/json'
	//var x = require('../funciones/listar');
	//console.log(js())
	export default {
		data() {
			return {
				dialogAdd: false,
				dialogView: false,
				dialogEdit: false,
				dialogError: false,
				listaTipos: [],
				listaMarcas: [],
				listaPersonas: [],
				lTipos: [],
				selectTipo: { value: 0, label: "" },
				selectMarca: { value: 0, label: "" },
				error: "",
				datos: [],
				persona: {
					id: 0,
					nombre: ""
				},
				dato: {
					id: null,
					placa: null,
					color: null,
					km_promedio: null,
					tipo_motoId: null,
					propietarioId: null,
					tipo_moto: {
						id: null,
						referencia: null,
						marcaId: null,
						marca: {
							id: null,
							nombre: null
						}
					},
					persona: {
						id: null,
						identificacion: null,
						nombre: null,
						telefono: null,
						correo: null,
						rol: null,
						uId: null
					}
				},
				page: 1,
				minPages: 1,
				max: 5,
				textFind:''
			};
		},
		beforeMount() {
			this.$nextTick(() => {
				this.cargarDatos();
				this.cargarMarcas();
				this.cargarTipos();
				this.cargarPersonas();
			});
		},
		computed: {
			...mapState("store", ["buscarStore"]),
			listarMotos: function() {
				const ctn = 5;
				let lista = this.datos.filter(
					d =>
						d.placa.indexOf(this.buscarStore.toUpperCase()) > -1 ||
						d.tipo_moto.referencia.indexOf(this.textFind.toUpperCase()) > -1 ||
						d.tipo_moto.marca.nombre.indexOf(this.textFind.toUpperCase()) >
							-1 ||
						d.persona.nombre.indexOf(this.textFind.toUpperCase()) > -1
				);
				if (this.numberPages < this.page) {
					this.page = 1;
				}
				return lista.slice((this.page - 1) * ctn, this.page * ctn);
			},
			numberPages: function() {
				let ctn = 5;
				let size = this.datos.filter(
					d =>
						d.placa.indexOf(this.textFind.toUpperCase()) > -1 ||
						d.tipo_moto.referencia.indexOf(this.textFind.toUpperCase()) > -1 ||
						d.tipo_moto.marca.nombre.indexOf(this.textFind.toUpperCase()) >
							-1 ||
						d.persona.nombre.indexOf(this.textFind.toUpperCase()) > -1
				).length;
				let n = parseInt(size) % ctn == 0 ? 0 : 1;
				return Math.trunc(size / ctn) + n;
			},
			listarTipos: function() {
				//console.log(this.lTipos.find(t => t.marcaId == this.selectMarca.value))
				if (this.selectMarca.value == 0) {
					return [];
				}
				var lista = this.listaMarcas.filter(
					t => t.value == this.selectMarca.value
				);
				//this.selectTipo = { value: 0, label: "" }
				return this.listaTipos.filter(t => t.marcaId == this.selectMarca.value);
			},
			listarPersonas: function() {
				if (
					this.listaPersonas.filter(
						v => v.nombre.toLowerCase() == this.persona.nombre.toLowerCase()
					).length == 1
				) {
					return [];
				} else {
					this.persona.id = 0;
				}
				if (this.persona.nombre.length < 1) {
					this.persona.id = 0;
					return [];
				} else {
					const find = this.listaPersonas.filter(
						v =>
							v.nombre.toLowerCase().indexOf(this.persona.nombre.toLowerCase()) >
							-1
					);
					if (find.length) {
						return this.listaPersonas.filter(
							v =>
								v.nombre
									.toLowerCase()
									.indexOf(this.persona.nombre.toLowerCase()) > -1
						);
					} else {
						return [{ id: 0, nombre: "No se encontraron coincidencias" }];
					}
				}
			},
			disabledButton: function() {
				/*if (this.dato.nombre != null) {
	                            if (JSON.stringify(this.dato.placa.toString().trim().length) == 0) {
	                                return true;
	                            }
	                        }else {
	                            return true;
	                        }*/
				return false;
			}
		},
		methods: {
			...mapActions("store", ["inputBuscar"]),
			escape(event) {
				if (event.key == "Escape") {
					this.dialogAdd = false;
					this.dialogEdit = false;
					this.dialogView = false;
					//this.inputBuscar('')
				}
			},
			propietario(persona) {
				this.persona = JSON.parse(JSON.stringify(persona));
				console.log(JSON.stringify(persona));
			},
			cargarDatos() {
				//this.inputBuscar('')
				//console.log(listar.ax())
				var ruta = "30/moto/findAll";//ok
				http(
					ruta,
					null,
					response => {
						this.datos = response.data.datos;
						console.log(this.datos)
					},
					e => {
						this.error = e.message;
						this.dialogError = true;
					}
				);
			},
			addMoto() {
				this.dialogAdd = true;
			},
			editMoto(dato) {
				this.dato = JSON.parse(JSON.stringify(dato));
				var marca = JSON.parse(JSON.stringify(dato.tipo_moto.marca));
				var tipo = JSON.parse(JSON.stringify(dato.tipo_moto));
				this.selectMarca = { value: marca.id, label: marca.nombre };
				this.selectTipo = { value: tipo.id, label: tipo.referencia };
				var persona = JSON.parse(JSON.stringify(dato.persona));
				this.persona = { id: persona.id, nombre: persona.nombre };
				/*this.selectMarca = JSON.parse(JSON.stringify(dato.tipo_moto.marca.map(item =>{
	                        return {
	                            value: item.id,
	                            label: item.nombre
	                        }
	                    })))*/
				//this.selectMarca.label = JSON.parse(JSON.stringify(dato).tipo_moto.marca.nombre)
				this.dialogEdit = true;
			},
			inputPersona(val) {
				//console.log(val.length)
			},
			viewMoto(dato) {
				this.dato = dato;
				this.dialogView = true;
			},
			selectedMarca(val) {
				this.selectTipo = { value: 0, label: "" };
				//this.listaTipos = this.listaTipos.find(x => x.valu)

				//console.log(this.lTipos.find(x=> x.marcaId == 2))
			},
			createMoto() {
				/*var ruta = 'moto/create'
	                        var datos = {id: this.dato.id, nombre: this.dato.nombre.toUpperCase(), adminId: 1}
	                        http(ruta, datos, response => {
	                            if(!response.data.error){
	                                this.cargarDatos()
	                                this.inputBuscar(response.data.datos.nombre)
	                                this.dialogAdd = false
	                            }

	                        }, e => {
	                        this.error = e.message
	                                this.dialogError = true
	                        })*/
			},
			updateMoto() {
				/*var ruta = 'servicioTaller/update'
	                        var datos = {id: this.dato.id, nombre: this.dato.nombre.toUpperCase(), adminId: 1}
	                        http(ruta, datos, response => {
	                            if(!response.data.error){
	                                if(response.data.datos[0] == 1){
	                                    this.cargarDatos()
	                                    this.inputBuscar(this.dato.nombre)
	                                    this.dialogEdit = false
	                                    console.log('Hubo Cambios')
	                                }
	                                if(response.data.datos[0] == 0){
	                                    this.cargarDatos()
	                                    this.inputBuscar(this.dato.nombre)
	                                    this.dialogEdit = false
	                                    console.log('No Hubo Cambios')
	                                }
	                            }
	                            else{
	                                this.error = response.data.mensaje
	                                this.dialogError = true
	                            }
	                        }, e => {
	                                this.error = e.message
	                                this.dialogError = true
	                        })*/
			},
			/*cargarMarcas() {
	                    //this.inputBuscar('')
	                    var ruta = "marca/findAllMarcaTipoMaps";
	                    http(ruta,null,response => {
	                            this.listaMarcas = response.data.datos.map(item =>{
	                                return {
	                                    value: item.id,
	                                    label: item.nombre
	                                }
	                            });
	                    },
	                    e => {
	                            this.error = e.message
	                            this.dialogError = true
	                    }
	                    );
	                },*/
			cargarMarcas() {
				//this.inputBuscar('')
				var ruta = "30/marca/findAllMarcaTipoMaps"; //ok
				http(
					ruta,
					null,
					response => {
						this.listaMarcas = response.data.datos;
					},
					e => {
						this.error = e.message;
						this.dialogError = true;
					}
				);
			},
			cargarTipos() {
				//this.inputBuscar('')
				var ruta = "30/tipoMoto/findAll"; //ok
				http(
					ruta,
					null,
					response => {
						this.listaTipos = response.data.datos.map(item => {
							return {
								value: item.id,
								label: item.referencia,
								marcaId: item.marcaId
							};
						});
						this.lTipos = response.data.datos;
						//console.log(this.listaTipos)
					},
					e => {}
				);
			},
			cargarPersonas() {
				var ruta = "30/persona/findAllNew";//ok
				http(
					ruta,
					null,
					response => {
						this.listaPersonas = response.data.datos.map(p => {
							return {
								id: p.id,
								nombre: p.nombre
							};
						});
					},
					e => {}
				);
			}
		}
	};
</script>

<style scoped>
	.fila {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}
</style>