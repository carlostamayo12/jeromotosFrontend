<template>
  <div class="q-pa-md fila" style="max-width: 600px; margin-top:80px;">
    <q-toolbar class="bg-red text-white rounded-borders">
      <q-toolbar-title>Personas</q-toolbar-title>
      <q-input dark dense standout v-model="textFind" input-class="text-left" class="q-ml-md text-uppercase">
        <template v-slot:append>
          <q-icon v-if="textFind === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="textFind = ''" />
        </template>
      </q-input>
      
    	<!-- Rol -->
			<q-btn-dropdown class="q-my-none" stretch flat :label="selectRol.label">
				<q-list>
					<q-item
						v-for="(selectRol,i) in listaRol"
						:key="i"
						clickable
						v-close-popup
						tabindex="0"
						@click="selectedRol(selectRol)"
					>
						<q-item-section>
							<q-item-label>{{selectRol.label}}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-btn-dropdown>
			<q-btn @click="addPersona" dense class="glossy q-ml-md" round color="grey-9" icon="add" />
		</q-toolbar>

    <q-list bordered style="max-width:600px;height: 300px;">
      <q-item
        v-for="(dato,i) in listarPersonas"
        :key="i"
        clickable
        v-ripple
        style="margin: 10px 16px;"
      >
        <q-item-section avatar>
          <q-icon name="person" style="font-size:30px;" color="grey-9" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">{{dato.nombre}}</q-item-label>
          <q-item-label caption>{{dato.identificacion}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon @click.native="editPersona(dato)" name="edit" color="grey-9" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="info" @click.native="viewPersona(dato)" color="grey-9" />
        </q-item-section>
      </q-item>
    </q-list>

		<div class="flex fila q-mt-xl" style="max-width:500px;" v-if="listarPersonas.length > 0">
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
	  
    <q-dialog v-model='dialogAdd' persistent>
			<Add :dato='dato' @click="createPersona" />
		</q-dialog>

    <q-dialog v-model='dialogEdit' persistent>
			<Edit :dato='dato' @click="updatePersona" />
		</q-dialog>

    <q-dialog v-model='dialogView'>
			<Ver :dato="dato" />
		</q-dialog>

    <q-dialog v-model='dialogError'>
			<Error :error="error" />
		</q-dialog>
    
	
  </div>
</template>

<script>
import { Dialog } from 'quasar'
import http from "../../../functions/http";
import numberPages from "../../../functions/numberPages";
import rol from "../../../functions/rol"

import Add from './Add'
import Edit from './Edit'
import Ver from './Ver'
import Error from '../Error'

export default {
  components:{
		Add, Edit, Ver, Error, Dialog
	},	
  data() {
      return {
        error: "",
        textFind: "",
        dialogAdd: false,
        dialogEdit: false,
        dialogView: false,
        dialogError: false,
				selectRol: { value: 0, label: "Clientes" },
				listaRol: [
					{ value: 0, label: "Clientes" },
					{ value: 1, label: "Tecnico" },
					{ value: 2, label: "Administrador" }
				],
        datos: [],
        dato: {
          id: null,
          identificacion: null,
          nombre: null,
          telefono: null,
          direccion: null,
          correo: null,
          rol: null,
          uId: null,
          token: null,
          adminId: 1
        },
        page: 1,
        minPages: 1,
        max: 5
      };
    },
    beforeMount() {
      this.$nextTick(() => {
        this.cargarDatos();
      });
    },
    computed: {
      listarPersonas: function() {
				const ctn = 5;
				let rol = 0;
				if (this.selectRol.value == 0) { } 
				else if (this.selectRol == 1) {} 
				else if (this.selectRol.value == 2) {}

				let lista = this.datos.filter(
					d =>
						d.nombre.indexOf(this.textFind.toUpperCase()) > -1 ||
						d.identificacion.indexOf(this.textFind.toUpperCase()) > -1 ||
						d.telefono.indexOf(this.textFind.toUpperCase()) > -1
				);
				if (this.numberPages < this.page) {
					this.page = 1;
				}
				//lista = rol.filterByRol(lista, this.selectRol.value);
				return lista.slice((this.page - 1) * ctn, this.page * ctn);
				
				//return this.datos;
			},
			numberPages: function() {
				return numberPages.persona(5, this.datos, this.textFind, this.selectRol)
			}
    },
    methods: {
      addPersona() {
        this.dato = {
          id: 0,
          identificacion: '',
          nombre: '',
          telefono: '',
          direccion: '',
          correo: '',
          rol: 0,
          uId: '',
          token: '',
          adminId: 1
        };
        this.dialogAdd = true;
      },
      createPersona(val, msg) {  
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
      editPersona(dato) {
        this.dato = JSON.parse(JSON.stringify(dato));
        this.dialogEdit = true;
      },
      updatePersona(val, msg) {
        if (!val) {
          console.log('if val :' + val + ' msg: ' + msg)
          this.error = "";
          this.textFind = msg;
          this.cargarDatos();
          this.dialogEdit = val;
        } else {
          console.log('else val :' + val + ' msg: ' + msg)
          this.textFind = "";
          this.error = msg;
          this.dialogError = val;
        }
      },
      viewPersona(dato) {
        this.dato = dato;
        this.dialogView = true;
			},
			selectedRol(rol) {
				console.log(rol)
				this.selectRol = JSON.parse(JSON.stringify(rol));
			},
      cargarDatos() {
        var ruta = "persona/findAll";
        http(
          ruta,
          null,
          response => {
            this.datos = response.data.datos;
          },
          e => {
            this.error = e.message;
            this.dialogError = true;
          }
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