<template>
<div class="q-pa-md fila" style="max-width: 500px; margin-top:80px;">
		<q-toolbar class="bg-red text-white rounded-borders">
		<q-toolbar-title>Motocicleta</q-toolbar-title>
				<q-input dark dense standout v-model="textFind" input-class="text-left" class="q-ml-md text-uppercase">
          <template v-slot:append>
            <q-icon v-if="textFind === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="textFind = ''" />
          </template>
        </q-input>
				<q-btn @click="addMoto" dense class="glossy q-ml-md" round color="grey-9" icon="add" />
      </q-toolbar>

		<q-list bordered style="max-width:500px;height: 300px;">
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

		<div class="flex fila q-mt-xl" style="max-width:500px;" v-if="listarMotos.length > 0">
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
	
		<q-dialog v-model='dialogAdd'>
			<Add :dato='dato' @click="createMoto" />
		</q-dialog>

		<q-dialog v-model='dialogEdit'>
			<Edit :dato='dato' @click="updateMoto" />
		</q-dialog>

		<q-dialog v-model='dialogView'>
			<Ver :dato='dato'/>
		</q-dialog>
	
		<q-dialog v-model='dialogError'>
			<Error :error='error'/>
		</q-dialog>

</div>
</template>

<script>
import { Dialog } from 'quasar'
import http from "../../../functions/http";
import numberPages from "../../../functions/numberPages";

import Add from './Add'
import Edit from './Edit'
import Ver from './Ver'
import Error from '../Error'


export default {
    components:{
		Add, Edit, Ver, Error, Dialog
	},	
    data(){
        return {
					error: 'xxxx',
					textFind: '',
					dialogAdd: false,
					dialogEdit: false,
					dialogView: false,
					dialogError: false,
					datos:[],
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
				}
		},
		beforeMount(){
			this.cargarDatos()
		},
		computed:{
			 listarMotos: function() {
				const ctn = 5;
				let lista = this.datos.filter(
					d =>
						d.placa.indexOf(this.textFind.toUpperCase()) > -1 ||
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
				return numberPages.moto(5, this.datos, this.textFind)
			},
		},
		methods:{
			createTabla(data){
				var ruta = 'tablaMantenimiento/create'
				var datos = {}
				http(ruta, datos,  )
			},
			addMoto(){
				this.textFind = ''
				this.dato ={
					id: 0,
					placa: '',
					color: '',
					km_promedio: null,
					tipo_motoId: null,
					propietarioId: '',
					tipo_moto: {
						id: null,
						referencia: null,
						marcaId: null,
						marca: {
							id: null,
							nombre: null
						}
					}
        }
        this.dialogAdd = true
			},
			createMoto(val, msg){
				
				if (!val) {
					this.error = ''
					this.textFind = msg
					this.cargarDatos();
					this.dialogAdd = val
        		} else {
          			this.textFind = ''
          			this.error = msg
          			this.dialogError = val
        		}
			},
			editMoto(dato) {
				this.dato = JSON.parse(JSON.stringify(dato));
				this.dialogEdit = true;
			},
			updateMoto(val, msg){
				if(!val){
					this.error = ''
					this.textFind = msg
					this.cargarDatos()
					this.dialogEdit = val
				}else{
					this.textFind = ''
					this.error = msg
					this.dialogError = true
				}
			},
			viewMoto(dato) {
				this.dato = dato;
				this.dialogView = true;
			},
			cargarDatos(){
				var ruta = "Moto/findAll";
				http( ruta, null, response => {
						if(!response.data.error){
							this.datos = response.data.datos;
						}else{
							this.error = response.data.mensaje
							this.dialogError = true
						}
					},
					e => {
						this.error = e.message;
						this.dialogError = true;
					}
				);
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
</style>