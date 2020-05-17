<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section style="background: #000" class="q-py-none text-white">
        <div class="text-overline q-py-none col">Orden # {{orden.id}}</div>
      </q-card-section>
      <q-card-section class="row q-pt-xs">
        <q-select
          label="Orden Servicio"
          color="black"
          dense
          class="q-mx-md col"
          v-model="selectOrden"
          :options="listaSelectOrden"
          @input="selectedOrden"
          style="max-width: 300px"
        />
        <q-input v-if="orden.id !== 0"
          label="Tecnico"
          color="black"
          dense
          readonly=""
          class="q-mx-md col"
          v-model="orden.tecnico.nombre"
          style="max-width: 300px"
        />

        <q-input v-if="orden.id !== 0"
          label="Fecha Ingreso"
          color="black"
          dense
          readonly=""
          class="q-mx-md col"
          v-model="orden.fechaIngreso"
          style="max-width: 300px"
        />

         <q-input v-if="orden.id !== 0"
          label="Kilometraje"
          color="black"
          dense
          readonly=""
          class="q-mx-md col"
          v-model="orden.kilometraje"
          style="max-width: 300px"
        />

        <q-input v-if="orden.id !== 0"
          label="Costo Repuestos"
          color="black"
          dense
          mask="#######"
          class="q-mx-md col"
          v-model="orden.costoRepuestos"
          style="max-width: 300px"
        />

        <q-input v-if="orden.id !== 0"
          label="Costo Servicio"
          color="black"
          dense
          mask="#######"
          class="q-mx-md col"
          v-model.trim="orden.costoServicio"
          style="max-width: 300px"
        />

        <q-btn color="red" v-if="orden.id !== 0"  icon="save" @click="finalizarOrden" label="Guardar" />


      </q-card-section>
    </q-card>
    
    <div class="row" v-if="orden.id !== 0">
      <DatosMoto class="my-card col q-mr-md" :orden="orden" :ultimo="ultimo" />
      <DatosPropietario class="my-card col" :orden="orden.moto" />
    </div>
  
    	<q-card class="q-mt-lg my-card col" style="max-width:30%" v-if="orden.id !== 0">
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
                disable
                color="black"
                :val="servicio.servicioTaller.id"
                v-model="checkedSolicitados"
              />
            </q-item-section>
            <q-item-section side>
              <q-checkbox
                color="black"
                :val="servicio.servicioTaller.id"
                v-model="checkedRealizados"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <pre>{{checkedRealizados}}</pre>
      <pre>{{orden}}</pre>
			<q-card class="q-mt-lg my-card col">
				<q-card-section>
          Solicitudes
				</q-card-section>
			</q-card>



    <q-dialog v-model="dialogError">
      <Error :error="error" />
    </q-dialog>

    <q-dialog v-model="dialogInformacion">
      <Error :informacion="informacion" />
    </q-dialog>
    
    
  </div>
</template>

<script>
  import { Dialog } from "quasar";
  import http from "../../../functions/http";
  import mapping from "../../../functions/mapping";
  import listar from "../../../functions/listar";
  import DatosMoto from "./Finalizar/DatosMoto";
  import DatosPropietario from "./Finalizar/DatosPropietario";
  import ServiciosRealizados from "./Finalizar/ServiciosRealizados";
  import Error from "../Error";
  import Informacion from "../Informacion";

  export default {
    components: {
      Dialog,
      DatosMoto,
      DatosPropietario,
      Error,
      Informacion
    },
    data() {
      return {
        ultimo: 3000,
        dialogError: false,
        dialogInformacion: false,
        error: "",
        informacion: "",
        listaEnvio: [],
        selectOrden: { value: 0, label: "" },
        listaSelectOrden: [],
        listaOrden: [],
        listaServicioTaller: [],
        checkedSolicitados: [],
        checkedRealizados: [],
        listaJoin:[],
        orden: {
          id: 0,
          fechaIngreso: 0,
          fechaEntregaEstimada: 0,
          fechaSalida: 0,
          kilometraje: "",
          kmTotal: 0,
          solicitudes: "",
          observaciones: "",
          costoServicio: 0,
          costoRepuestos: 0,
          estado:'',
          motoId: 0,
          tecnicoId: 0,
          adminId: 1,
          tecnico: {
            nombre: ''
          },
          moto: {
            id: 0,
            placa: 'AAAS',
            color: '',
            km_promedio: "0.00",
            tipo_motoId: '',
            propietarioId: '',
            persona: {
              nombre: '',
              telefono: null,
              direccion: null,
            },
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
        }
      };
    },
    beforeMount() {
      this.$nextTick(() => {
        this.cargarOrdenes();
      });
    },
    computed: {
      numeroOrden: function(){
        /*if(this.orden.id === 0){
          return ''
        }else{
          if(this.orden.id === 1){
            return '0000' + this.oreden.id
          }
          if(this.orden.id === 2){
            return '000' + this.oreden.id
          }
        }*/  
        
      
      }
    },
    methods: {
      
      finalizarOrden(){
        this.listaEnvio = mapping.serviciosRealizados(this.listaServicioTaller, this.checkedRealizados)
        this.orden.fechaSalida = Number.parseFloat((this.$moment().format("X"))/(3600*24)).toFixed(5)
        this.orden.estado = 'Finalizado'
        var ruta = 'ordenEntrada/finalizar'
        var datos = { orden: this.orden, adminId: 1 }
        
        var ruta = 'tablaMantenimiento/joinContador'
        var listaJoin = []
        
        http(ruta, { motoId: this.orden.motoId }, response =>{
          if(!response.data.error){
            listaJoin = response.data.datos
            //console.log(response.data.datos)
            var ruta = 'ordenentrada/findAllByMoto'
            http(ruta, { motoId: this.orden.motoId }, response => {
                if(!response.data.error){
                  listar.ordenSalidaEnvio(this.orden.moto.km_promedio, listaJoin, response.data.datos, this.checkedRealizados, this.orden.fechaSalida)
                }else{
                  console.log(response.data.mensaje)
                }
            }, e =>{
              console.log(e.message)
            })
          }else{
            console.log(response.data.mensaje)
          }
        }, e =>{
          console.log(e.message)
        })
        
        
        /*var ruta = 'ordenentrada/findAllByMoto'
        http(ruta, {motoId: this.orden.motoId}, response => {
          if(!response.data.error){
            var ruta = 'ordenentrada/findAllByMoto'
            http('')
          }else{
            console.log(response.data.mensaje)
          }
          
          //console.log(response.data.datos)
          //listar.ordenSalidaEnvio(response.data.datos)
        }, e => {
          console.log(e.message)
        })*/
        
        /*var ruta = 'ordenentrada/findAllByMoto'
        http(ruta, {motoId: this.orden.motoId}, response =>{
          if(!response.data.error){
            //if((response.data.datos.filter(o => o.estado === 'Finalizado' )).length > 0 ){
              //console.log( (response.data.datos.filter(o => o.estado === 'Finalizado' )).length > 0 )
            //listar(this.orden.moto.km_promedio,listaJoin, response.data.datos,this.checkedRealizados, this.orden.fechaSalida)
            var x = listar(response.data.datos)
            console.log(response.data.datos)
            //}
          }else{
            console.log(response.data.mensaje)
          }
        }, e =>{
            console.log(e)
        })*/

        

        
        /*http(ruta, datos, response => {
          if(!response.data.error){
            this.cargarOrdenes()
            this.orden = mapping.datoOrdenNew(this.orden)
          }else{
            this.error = response.data.mensaje
            this.dialogError = true
          }
        }, e=>{
          this.error = e.message
          this.dialogError = true
        })*/
      },
      selectedOrden() {
        this.checkedSolicitados = []
        this.orden = (this.listaOrden.filter(o => o.id === this.selectOrden.value))[0];
        this.listaServicioTaller = this.orden.servicios
        this.checkedSolicitados = mapping.toCheckedSolicitados(this.orden.servicios)
        //this.orden.solicitudes = response.data.datos.split('**')
      },
      cargarOrdenes() {
        var ruta = "ordenEntrada/findAllIniciadas";
        http(
          ruta,
          null,
          response => {
            if (!response.data.error) {
              if (response.data.datos.length > 0) {
                this.listaOrden = response.data.datos;
                this.listaSelectOrden = mapping.ordenSelect(response.data.datos);
              } else {
                this.informacion = "No Existen Ordenes";
                this.dialogInformacion = true;
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
