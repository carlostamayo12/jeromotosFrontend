<template>
  <div class="q-pa-md fila" style="max-width: 550px; margin-top:80px;">
    <q-toolbar class="bg-red text-white rounded-borders">
      <q-toolbar-title>Tipo Moto</q-toolbar-title>
      <q-space />
      <q-input dark dense standout v-model="textFind" input-class="text-left" class="q-ml-md">
        <template v-slot:append>
          <q-icon v-if="textFind === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="textFind = ''" />
        </template>
      </q-input>
      <q-btn @click="addTipo" dense class="glossy q-ml-md" round color="grey-9" icon="add" />
    </q-toolbar>
		
    <q-list bordered style="max-width:550px;height: 300px;">
      <q-item
        v-for="(dato,i) in listarTipoMotos"
        :key="i"
        clickable
        v-ripple
        style="margin:10px 16px;"
      >
        <q-item-section avatar>
          <q-icon name="motorcycle" style="font-size:30px;" color="grey-9" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-bold">{{dato.referencia}}</q-item-label>
          <q-item-label caption>{{dato.marca.nombre}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon @click.native="editTipo(dato)" name="edit" color="grey-9" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="info" @click.native="viewTipo(dato)" color="grey-9" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Pagination -->
		<div class="flex fila q-mt-xl" style="max-width:450px;" v-if="listarTipoMotos.length > 0">
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

    <!-- dialog Add -->
    <q-dialog v-model="dialogAdd" persistent>
      <q-card style="min-width: 600px">
        <q-card-section class="q-py-xs">
          <div class="text-h6">Crear Tipo Moto</div>
        </q-card-section>
        <q-card-section class="row q-py-none">
          <q-select dense v-model="marca" :options="listMarcas" class="col" style="padding: 0" />
          <q-input
            dense
            v-model="dato.referencia"
            class="text-uppercase col q-mx-md"
            autofocus
            @keyup.enter="dialogAddClose"
          />
        </q-card-section>
        <q-card-section class="q-pt-md">
          <q-list dense>
            <q-item-label class="fila text-bold" header>Tabla Mantenimiento</q-item-label>
            <q-item>
              <q-item-section class="col">
                <q-item-label dense header class="q-px-none">Servicio taller</q-item-label>
              </q-item-section>
              <q-item-section class="col-2">
                <q-item-label dense header class="q-px-none">Km</q-item-label>
              </q-item-section>
              <q-item-section class="col-2">
                <q-item-label dense header class="q-px-none">tiempo(m)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense v-for="(datoEnvio,i) in listaServicios" :key="i">
              <q-item-section class="col">
                <q-item-label dense>{{datoEnvio.nombre}}</q-item-label>
              </q-item-section>

              <q-item-section class="col-2">
                <q-select
                  class="q-py-none"
                  dense
                  v-model="datoEnvio.km"
                  :options="listakm"
                  style="padding: 0px !important;"
                />
              </q-item-section>

              <q-item-section class="col-2">
                <q-select
                  dense
                  v-model="datoEnvio.tiempo"
                  :options="listaTiempo"
                  style="padding: 0"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Aceptar" :disable="disabledButton" @click="createTipo" />
        </q-card-actions>
      </q-card>
    </q-dialog>

		<q-dialog v-model="dialogView" persistent>
      <q-card style="min-width: 600px">
				<q-card-section class="q-py-xs">
          <div class="text-h6">Tipo Moto</div>
        </q-card-section>
				<q-card-section class="row q-py-none">
					{{tituloView}}
				</q-card-section>
        <q-card-section class="q-pt-md">
          <q-list dense>
            <q-item-label class="fila text-bold" header>Tabla Mantenimiento</q-item-label>
            <q-item>
              <q-item-section class="col">
                <q-item-label dense header class="q-px-none">Servicio taller</q-item-label>
              </q-item-section>
              <q-item-section class="col-2">
                <q-item-label dense header class="q-px-none">Km</q-item-label>
              </q-item-section>
              <q-item-section class="col-2">
                <q-item-label dense header class="q-px-none">tiempo(m)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense v-for="(tm,i) in listaTablaMantenimiento" :key="i">
							<q-item-section class="col-7">
								<q-item-label style="font-size:10px;" class="text-bold">{{tm.servicioTaller.nombre}}</q-item-label>
							</q-item-section>
							<q-item-section class="col-3">
								<q-item-label caption class="text-bold text-center">{{tm.kilometraje}}</q-item-label>
							</q-item-section>
							<q-item-section>
								<q-item-label caption class="text-bold text-center">{{tm.tiempo}}</q-item-label>
							</q-item-section>
						</q-item>
          </q-list>
        </q-card-section>
				
				<q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
        </q-card-actions>
      </q-card>
		</q-dialog>	

		<!-- dialog View -->
		<!--<q-card-section class="q-pt-none">
					<q-input dense v-model="dato.referencia" class="text-uppercase text-bold" readonly />
					<q-input dense v-model="dato.marca.nombre" class="text-uppercase text-bold" readonly />
					<p class="text-center text-bold q-mt-md">Tabla Mantenimiento {{dato.referencia}}</p>

					<q-list dense>
						<q-item>
							<q-item-section class="col-7">
								<q-item-label class="text-bold">Servicio Taller</q-item-label>
							</q-item-section>
							<q-item-section class="col-3">
								<q-item-label class="text-bold text-center">kilometraje</q-item-label>
							</q-item-section>
							<q-item-section>
								<q-item-label class="text-bold text-center">Tiempo</q-item-label>
							</q-item-section>
						</q-item>
						<q-item dense v-for="(tm,i) in listaTablaMantenimiento" :key="i">
							<q-item-section class="col-7">
								<q-item-label style="font-size:10px;" class="text-bold">{{tm.servicioTaller.nombre}}</q-item-label>
							</q-item-section>
							<q-item-section class="col-3">
								<q-item-label caption class="text-bold text-center">{{tm.kilometraje}}</q-item-label>
							</q-item-section>
							<q-item-section>
								<q-item-label caption class="text-bold text-center">{{tm.tiempo}}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card-section>

				<q-card-actions align="right" class="text-black">
					<q-btn flat label="Cancel" v-close-popup />
					<q-btn flat label="Aceptar" @click="dialogView = false" />
				</q-card-actions>
			</q-card>
		</q-dialog>-->

    <!-- dialog Eror -->
    <q-dialog v-model="dialogError">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">{{error}}</q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import http from "../functions/http";

  function listaKmJSON() {
    var obj = [];
    for (let i = 0; i <= 20; i++) {
      obj.push({ value: i, label: (i * 1000).toString() });
    }
    return obj;
  }

  function listaTimeJSON() {
    var obj = [];
    for (let i = 0; i <= 24; i++) {
      obj.push({ value: i, label: i.toString() });
    }
    return obj;
  }

  function envioCreate(data, tipoId) {
		//.filter(d => d.km.value > 0 || d.tiempo.value > 0)
		return data.map(item => {
        return {
          id: 0,
          km: item.km.value * 1000,
          tiempo: item.tiempo.label,
          estado: (item.km.value > 0 || item.tiempo > 0) ? 1 : 0,
          servicioId: item.servicioId,
          tipo_motoId: tipoId
        };
      });
  }

  function validarlistaServicios(data) {
    return data.filter(d => d.km.value > 0 || d.tiempo.value > 0).length;
  }

  export default {
    data() {
      return {
				tituloView:'',
				marca: { value: 0, label: "" },
        listaServicios: [],
        dialogView: false,
        dialogEdit: false,
        dialogError: false,
        dialogAdd: false,
        error: "",
        textFind: "",
        page: 1,
        minPages: 1,
        max: 5,
        datos: [],
        dato: {
          id: null,
          referencia: null,
          marcaId: null,
          marca: {
            id: null,
            nombre: null
          },
          datoEnvio: {
            id: null,
            nombre: null,
            km: {
              value: 0,
              label: "0"
            },
            tiempo: {
              value: 0,
              label: "0"
            },
            estado: 0,
            servicioId: null
          },
          listMarcas: [],
          listaServiciosTaller: [],
          listaServicios: [],
          listaTablaMantenimiento: [],
          listaTablaEdit: [],
          listaTablaEditar: [],
          //listakm:[{val:-1, label:''}],
          listaTiempo: [],
          selectMarca: { value: 0, label: "" }
          //selectMarca:null
        }
      };
    },
    computed: {
      listarTipoMotos: function() {
        const ctn = 5;
        let lista = this.datos.filter(
          d =>
            d.referencia.indexOf(this.textFind.toUpperCase()) > -1 ||
            d.marca.nombre.indexOf(this.textFind.toUpperCase()) > -1
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
            d.referencia.indexOf(this.textFind.toUpperCase()) > -1 ||
            d.marca.nombre.indexOf(this.textFind.toUpperCase()) > -1
        ).length;
        let n = parseInt(size) % ctn == 0 ? 0 : 1;
        return Math.trunc(size / ctn) + n;
      },
      disabledButton: function() {
        if (this.dato.referencia != null) {
          if (
            JSON.stringify(this.dato.referencia.toString().trim().length) == 0 ||
            this.marca == null ||
            validarlistaServicios(this.listaServicios) == 0
          ) {
            return true;
          }
        } else {
          if (
            this.marca == null ||
            validarlistaServicios(this.listaServicios) == 0
          ) {
            return true;
          }
        }
        return false;
      }
    },

    beforeMount() {
      this.$nextTick(() => {
        this.cargarDatos();
        this.cargarMarcas();
        this.cargarServiciosTaller();
        //this.cargarTablaMantenimiento();
        this.listakm = listaKmJSON();
        this.listaTiempo = listaTimeJSON();
      });
    },
    methods: {
      dialogAddClose() {
        this.dialogAdd = false;
      },
      createTipo() {
        var datos = {
          id: 0,
          referencia: this.dato.referencia.toUpperCase(),
          marcaId: this.marca.value,
          adminId: 1,
          lista: envioCreate(this.listaServicios)
        };

        var ruta = "tipomoto/create";
        http(
          ruta,
          datos,
          response => {
            //console.log(response.data.datos);
						this.textFind = response.data.datos.referencia
						http(
              "tablamantenimiento/create",
              { lista: envioCreate(this.listaServicios, response.data.datos.id) },
              response => {
								this.dialogAdd = false;
              },
              e => {
                this.dialogError = true;
                this.error = e.message;
              }
            );
          },
          e => {
            this.dialogError = true;
            this.error = e.message;
          }
        );
      },
      addTipo() {
        this.dato = {
          id: 0,
          referencia: null,
          marcaId: null,
          marca: {
            id: null,
            nombre: null
          }
        };
        this.dialogAdd = true;
        this.marca = { value: 0, label: "" };
      },
      viewTipo(dato) {
				this.dato = JSON.parse(JSON.stringify(dato));
				this.tituloView = this.dato.referencia + "  " + this.dato.marca.nombre
				this.cargarTablaMantenimiento();
				this.dialogView = true;
			},
      editTipo(dato) {},
			cargarTablaMantenimiento(){
				var ruta = "tablaMantenimiento/findByTipoMoto";
				var datos = { tipoMoto: this.dato.id };
				http(
					ruta,
					datos,
					response => {
						this.listaTablaMantenimiento = response.data.datos.filter(
							x => x.estado
						);
						this.listaTablaEdit = response.data.datos.map(item => {
							//console.log(this.listaServiciosTaller)
							if (
								this.listaServicios.find(
									s => s.servicioId == item.servicioId
								)
							) {
								console.log("ser");
							} else {
								console.log();
							}

							return {
								id: item.id,
								nombre: item.servicioTaller.nombre,
								km: item.kilometraje,
								tiempo: item.tiempo,
								estado: item.estado,
								servicioId: item.servicioId,
								tipo_motoId: item.tipo_motoId
							};
						});
					},
					e => {}
				);
			},

			
			cargarServiciosTaller() {
        this.textFind = "";
        //this.inputBuscar('')
        var ruta = "servicioTaller/findAll";
        http(
          ruta,
          null,
          response => {
            this.listaServicios = response.data.datos.map(item => {
              return {
                id: 0,
                nombre: item.nombre,
                km: { value: 0, label: "0" },
                tiempo: { value: 0, label: "0" },
                estado: 0,
                servicioId: item.id
              };
            });
          },
          e => {
            this.error = e.message;
            this.dialogError = true;
          }
        );
      },
      cargarDatos() {
        this.textFind = "";
        var ruta = "tipoMoto/findAll";
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
      },
      cargarMarcas() {
        this.textFind = "";
        var ruta = "marca/findAllMarcaMaps";
        http(
          ruta,
          null,
          response => {
            this.listMarcas = response.data.datos;
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

  /*div.q-field_native.rows.items-center{
  			padding: 0px !important;
  		}*/
</style>
