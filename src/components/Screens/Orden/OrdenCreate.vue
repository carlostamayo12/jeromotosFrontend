<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section style="background: #000" class="text-white q-py-none">
        <div class="text-overline q-py-none">Orden #000{{orden.id}}</div>
      </q-card-section>
      <q-card-section class="row q-pt-xs">
        <q-btn round color="red" icon="search" @click="findMoto" />

        <q-select
          v-if="dato.id !== 0"
          label="Tecnico"
          color="black"
          dense
          class="q-mx-md col"
          v-model="selectTecnico"
          :options="listaTecnicos"
          style="max-width: 300px"
        />

        <q-input
          v-if="dato.id !== 0"
          color="black"
          dense
          v-model.trim="orden.kilometraje"
          class="q-mx-lg col"
          autofocus
          mask="#####"
          stack-label
          label="Kilometraje"
          style="max-width: 100px"
        />

        <q-btn
          color="red"
          v-if="dato.id !== 0"
          :disable="disabledButton"
          icon="save"
          @click="createOrden"
          label="Guardar"
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialogFind" persistent>
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

    <div class="row" v-if="dato.id !== 0">
      <DatosMoto class="my-card col q-mr-md" :dato="dato" :ultimo="ultimo" />
      <DatosPropietario class="my-card col" :dato="dato" />
    </div>
    <!--<pre>{{dialogError}}</pre>
    <pre>{{error}}</pre>-->
    <div class="row my-card q-mt-none q-py-none" v-if="dato.id !== 0">
      <!-- Lista Servicios -->
      <q-card class="q-mt-lg my-card col" style="max-width:30%">
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

      <q-card class="q-mt-lg my-card col q-ml-md">
        <p class="bg-black text-white q-py-xs q-pl-md q-mb-none text-overline">Solicitudes</p>
        <q-card-section>
          <q-input label="Solicitud1" color="black" v-model="solicitud_1" type="textarea" autogrow />
          <q-input label="Solicitud2" color="black" v-model="solicitud_2" type="textarea" autogrow />
          <q-input label="Solicitud3" color="black" v-model="solicitud_3" type="textarea" autogrow />
        </q-card-section>
      </q-card>

      <q-dialog v-model="dialogError">
        <Error :error="error" />
      </q-dialog>

      <q-dialog v-model="dialogInformacion">
        <Informacion :informacion="informacion" />
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import { Dialog } from "quasar";
  import http from "../../../functions/http";
  import mapping from "../../../functions/mapping";

  import DatosMoto from "./Crear/DatosMoto";
  import DatosPropietario from "./Crear/DatosPropietario";
  import Error from "../Error";
  import Informacion from "../Informacion";

  export default {
    components: {
      DatosMoto,
      DatosPropietario,
      Dialog,
      Error,
      Informacion
    },
    data() {
      return {
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
          estado: "Iniciado",
          motoId: 0,
          tecnicoId: 0,
          adminId: 1
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
        km: "",
        listaServicioTaller: [],
        listaServiciosEnvio: [],
        selectTecnico: { value: 0, label: "" },
        listaTecnicos: [],
        fechaEntregaEstimada: "31/03/2200",

        solicitud_1: "",
        solicitud_2: "",
        solicitud_3: "",
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
    computed: {
      disabledButton: function() {
        if (
          this.dato.id > 0 &&
          this.date.length > 0 &&
          (this.checkedSolicitados.length > 0 ||
            this.solicitud_1 !== "" ||
            this.solicitud_2 !== "" ||
            this.solicitud_3 !== "") &&
          this.orden.kilometraje.length > 0 &&
          this.selectTecnico.value > 0 &&
          (this.ultimo === 'No Registra' || this.orden.kilometraje > this.ultimo )
        ) {
          return false;
        }
        return true;
      }
    },
    beforeMount() {
      this.$nextTick(() => {
        this.cargarlistaTecnicos();
        this.ultimaOrden();
      });
    },
    methods: {
      findMoto() {
        this.findPlaca = "";
        this.dialogFind = true;
      },
      findMotoAcept() {
        this.cargarMoto()
      },
      closeDialogFind() {
        this.dialogFind = false;
      },
      createOrden() {
        
        this.orden.fechaIngreso = Number.parseFloat(
          this.$moment().format("X") / (3600 * 24)
        ).toFixed(5);
        this.orden.motoId = JSON.parse(JSON.stringify(this.dato.id));
        this.orden.tecnicoId = JSON.parse(
          JSON.stringify(this.selectTecnico.value)
        );
        this.listaServiciosEnvio = mapping.serviciosSolicitados(
          this.listaServicioTaller,
          this.checkedSolicitados,
          this.orden.id
        );
        this.orden.solicitudes =
          this.solicitud_1 + "**" + this.solicitud_2 + "**" + this.solicitud_3;

        var datos = { orden: this.orden, lista: this.listaServiciosEnvio };
        var ruta = "ordenEntrada/create";
        http(
          ruta,
          datos,
          response => {
            if (!response.data.error) {
              this.ultimaOrden();
              this.dato = mapping.datoMotoOrdenNuevo(this.dato);
              this.orden = mapping.datoOrdenNew(this.orden);
              this.solicitud_1 = "";
              this.solicitud_2 = "";
              this.solicitud_3 = "";
              this.selectTecnico = { value: 0, label: "" };
              this.checkedSolicitados = [];
              //this.informacion = 'Generada la orden'
              //this.dialogInformacion = true
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
      existeOrden(motoId) {
        var ruta = "ordenEntada/Exist";
        var datos = { motoId: motoId };
      },
      cargarMoto() {
        var ruta = "moto/findByPlaca";
        http(
          ruta,
          { placa: this.findPlaca },
          response => {
            if (!response.data.error) {
              console.log(response.data.datos.length > 0);
              if (response.data.datos.length > 0) {
                
                this.dato = response.data.datos[0];
                this.findPlaca = "";
                this.dialogFind = false;
                this.cargarServicioTaller(response.data.datos[0].tipo_motoId);

                var ruta = "ordenentrada/ultimokm";
                http(
                  ruta,
                  { motoId: this.dato.id },
                  response => {
                    if (!response.data.error) {
                      if (response.data.datos !== null) {
                        this.ultimo = response.data.datos.kilometraje;
                      } else {
                        this.ultimo = "No Registra";
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
              } else {
                
                //this.informacion = "No Hay Coincidencias";
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
      ultimaOrden() {
        var ruta = "ordenentrada/ultimaOrden";
        http(
          ruta,
          {},
          response => {
            if (!response.data.error) {
              if (response.data.datos.length > 0) {
                this.orden.id = response.data.datos[0].id + 1;
              } else {
                this.orden.id = 1;
              }
            } else {
              this.dialogError = true;
              this.error = response.data.mensaje;
            }
          },
          e => {
            this.dialogError = true;
            this.error = e.message;
          }
        );
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
