<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section style="background: #000" class="text-white q-py-none">
        <div class="text-overline q-py-none">Orden #000{{orden.id}}</div>
      </q-card-section>
      <q-card-section class="row q-pt-xs">
        <q-btn round color="red" icon="search" @click="findMoto" />

        <q-select
          label="Tecnico"
          color="black"
          dense
          class="q-mx-md col"
          v-model="selectTecnico"
          :options="listaTecnicos"
          style="max-width: 300px"
        />

        <q-input dense v-model="date" color="black">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date color="red" v-model="date" mask="YYYY-MM-DD HH:mm" />
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time color="red" v-model="date" mask="YYYY-MM-DD HH:mm" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          color="black"
          dense
          v-model.trim="km"
          class="q-mx-lg col"
          autofocus
					mask="#####"
          stack-label
          label="Kilometraje"
					style="max-width: 100px"
        />

				 <q-btn color="red" :disable="disabledButton" icon="save" @click="createOrden" label="Guardar" />
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialogFind">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Buscar Motocicleta</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            color="black"
            v-model.trim="findPlaca"
            mask="AAA##A"
            class="text-uppercase"
            autofocus
            dense
            maxlength="20"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-black">
          <q-btn flat label="Cancel" @click="closeDialogFind()" />
          <q-btn flat label="Aceptar" @click="findMotoAcept()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    
		<div class="row">
      <DatosMoto class="my-card col q-mr-md" :dato="dato" :ultimo="ultimo" />
      <DatosPropietario class="my-card col" :dato="dato" />
    </div>

    <div class="row my-card q-mt-none q-py-none">
      <!-- Lista Servicios -->
			<q-card class="q-mt-lg my-card col" style="width:30%" v-if="listaServicioTaller.length > 0">
        <q-list bordered>
          <p class="bg-black text-white q-py-xs q-pl-md q-mb-none text-overline">Servicios Taller</p>
          <q-item
            dense
            class="q-my-none q-pa-none"
            v-for="(servicio,i) in listaServicioTaller"
            :key="i"
            clickable
            v-ripple
            style="margin: 10px 16px;"
          >
            <q-item-section>
              <q-item-label>{{servicio.servicioTaller.nombre}}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox
                color="black"
                :val="servicio.servicioTaller.id"
                v-model="checkedSolicitados"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

			<q-card class="q-mt-lg my-card col">
				<q-card-section>
					<pre>{{checkedSolicitados}}</pre>
				</q-card-section>
			</q-card>

      <q-dialog v-model="dialogError">
        <Error :error="error" />
      </q-dialog>

      <q-dialog v-model="dialogInformacion">
        <Error :informacion="informacion" />
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import { Dialog } from "quasar";
  import http from "../../../functions/http";
  import Cabecera from "./Crear/Cabecera";
  import DatosMoto from "./Crear/DatosMoto";
  import DatosPropietario from "./Crear/DatosPropietario";
  import ServiciosSolicitados from "./Crear/ServiciosSolicitados";
  import Solicitudes from "./Crear/Solicitudes";
  import Error from "../Error";
  import Informacion from "../Informacion";

  export default {
    components: {
      Cabecera,
      DatosMoto,
      DatosPropietario,
      ServiciosSolicitados,
      Solicitudes,
      Dialog,
      Error,
      Informacion
    },
    data() {
      return {
				orden:{
					id: 0,
					fechaIngreso: '',
					fechaEntregaEstimada: '',
					fechaSalida: '',
					kilometraje: 0,
					kmTotal: 0,
					solicitudes: '',
					observaciones: '',
					costoServicio: 0,
					costoRepuestos: 0,
					motoId: 0,
					tecnicoId: 0
				},
				error: "",
        informacion: "",
        dialogError: false,
        dialogFind: false,
        dialogInformacion: false,
        findPlaca: "",
        date: "2019-02-01 12:44",
        checkedSolicitados: [],
        servicio: {
          id: null,
          nombre: null
        },
        km: '',
        teal: true,
        listaServicioTaller: [],
        selectTecnico: { value: 0, label: "" },
        listaTecnicos: [],
        fechaEntregaEstimada: "31/03/2200",

        dato: {
          id: 0,
          placa: null,
          color: null,
          km_promedio: "0.00",
          tipo_motoId: null,
          propietarioId: null,
          tipo_moto: {
            referencia: null,
            marca: {
              nombre: null
            }
          },
          persona: {
            nombre: null,
            telefono: null,
            direccion: null
          }
        },
        ultimo: 2500
      };
		},
		computed:{
			disabledButton: function (){
				if(this.dato.id > 0 && this.date.length > 0 && 
					 this.checkedSolicitados.length > 0 && 
					 this.km.length > 0 && this.selectTecnico.value > 0){
					return false
				}
				return true
				
			}
		},
    beforeMount() {
      this.$nextTick(() => {
        //this.cargarDatos();
				this.cargarlistaTecnicos();
				this.ultimaOrden()
      });
    },
    methods: {
      findMoto() {
        this.findPlaca = "";
        this.dialogFind = true;
      },
      findMotoAcept() {
        this.cargarMoto();
      },
      closeDialogFind() {
        this.dialogFind = false;
      },
      cargarDatos() {},
			createOrden(){},
      existeOrden(motoId) {
        var ruta = "ordenEntada/Exist";
        var datos = { motoId: motoId };

        /*http(ruta, datos, response => {
  					//if()
  				}, e => {

  				})*/
      },
			cargarMoto() {
        var ruta = "moto/findByPlaca";
        http(
          ruta,
          { placa: this.findPlaca },
          response => {
            if (!response.data.error) {
              if (response.data.datos.length > 0) {
                this.dato = response.data.datos[0];
                this.findPlaca = "";
                this.dialogFind = false;
                this.cargarServicioTaller(response.data.datos[0].tipo_motoId);
              } else {
                this.informacion = "No Hay Coincidencias";
                //this.dialogInformacion = true
                this.dialogError = true;
                this.error = "No Hay Coincidencias";
              }
            } else {
              this.error = response.data.mensaje;
              this.dialogError = true;
            }
          },
          e => {
            this.error = e.message;
            this.dialogError = true;
          }
        );
      },
      cargarServicioTaller(tipoMoto) {
        var ruta = "tablamantenimiento/findbytipoMoto";
        var datos = { tipoMoto: tipoMoto };

        http(
          ruta,
          datos,
          response => {
            if (!response.data.error) {
              this.listaServicioTaller = response.data.datos;
            } else {
            }
          },
          e => {}
        );
			},
			ultimaOrden(){
				var ruta = 'ordenentrada/ultimaOrden'
				http(ruta, {}, response => {
					if(!response.data.error){
						if(response.data.datos.length > 0){
							this.orden.id = response.data.datos[0].id +1
						}else{	
							this.orden.id = 1
						}
					}else{
						this.diaogError = true
						this.error = response.data.mensaje
					}
				},e =>{
						this.diaogError = true
						this.error = e.message
				})
			},

      cargarlistaTecnicos() {
        var ruta = "persona/tecnicoMap";
        http(
          ruta,
          null,
          response => {
            this.listaTecnicos = response.data.datos;
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
  .my-card {
    width: 100%;
    /*border: 1px solid black;*/
  }
</style>
