<template>
<div class="q-pa-md fila" style="max-width: 500px; margin-top:80px;">
		<q-toolbar class="bg-red text-white rounded-borders">
		<q-toolbar-title>Servicios Taller</q-toolbar-title>
				<q-input dark dense standout v-model="textFind" input-class="text-left" class="q-ml-md">
          <template v-slot:append>
            <q-icon v-if="textFind === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="textFind = ''" />
          </template>
        </q-input>
				<q-btn @click="addServiciosTaller" dense class="glossy q-ml-md" round color="grey-9" icon="add" />
      </q-toolbar>

		<q-list bordered style="max-width:500px;height: 300px;">
			<q-item v-for="(dato,i) in listarServiciosTaller" :key="i" clickable v-ripple style="margin: 10px 16px;">
				<q-item-section avatar>
					<q-icon name="motorcycle" style="font-size:30px;" color="grey-9" />
				</q-item-section>
				<q-item-section>
					<q-item-label class="text-bold">{{dato.nombre}}</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-icon @click.native="editServiciosTaller(dato)" name="edit" color="grey-9" />
				</q-item-section>
				<q-item-section side>
					<q-icon name="info" @click.native="viewServiciosTaller(dato)" color="grey-9" />
				</q-item-section>
			</q-item>
		</q-list>

		<div class="flex fila q-mt-xl" style="max-width:500px;" v-if="listarServiciosTaller.length > 0">
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
			<Add :dato='dato' @click="createServiciosTaller" />
		</q-dialog>

		<q-dialog v-model='dialogEdit'>
			<Edit :dato='dato' @click="updateServiciosTaller" />
		</q-dialog>

		<q-dialog v-model='dialogView'>
			<View :dato='dato'/>
		</q-dialog>



</div>
</template>

<script>
import http from "../functions/http"
import numberPages from "../functions/numberPages"
import Add from 'components/Dialogs/ServicioTaller/Add'
import Edit from 'components/Dialogs/ServicioTaller/Edit'
import View from 'components/Dialogs/ServicioTaller/View'
import Error from 'components/Dialogs/Error'
export default {
    components:{
		Add, Edit, View, Error
	},	
    data(){
        return {
					error: '',
					textFind: '',
					dialogAdd: false,
					dialogEdit: false,
					dialogView: false,
					datos:[],
					dato:{
						id: null,
						nombre: null
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
			listarServiciosTaller: function() {
				const ctn = 5;
				let lista = this.datos.filter(
					d => d.nombre.indexOf(this.textFind.toUpperCase()) > -1
				);
				if (this.numberPages < this.page) {
					this.page = 1;
				}
				return lista.slice((this.page - 1) * ctn, this.page * ctn);
			},
			numberPages: function() {
				return numberPages.servicioTaller(5, this.datos, this.textFind)
			},
		},
		methods:{
			addServiciosTaller(){
				this.dato ={
					id: 0,
					nombre: ''
				}
				this.dialogAdd = true
			},
			createServiciosTaller(val, msg){
				if(!val){
					this.error = ''
					this.textFind = msg
					this.cargarDatos()
					this.dialogAdd = val
				}else{
					this.textFind = ''
					this.error = msg
				}
			},
			editServiciosTaller(dato) {
				this.dato = JSON.parse(JSON.stringify(dato));
				this.dialogEdit = true;
			},
			updateServiciosTaller(val, msg){
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
			viewServiciosTaller(dato) {
				this.dato = dato;
				this.dialogView = true;
			},
			cargarDatos(){
				var ruta = "servicioTaller/findAll";
				http( ruta, null, response => {
						this.datos = response.data.datos;
					},
					e => {
						this.error = e.message;
						this.dialogError = true;
					}
				);
			}
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