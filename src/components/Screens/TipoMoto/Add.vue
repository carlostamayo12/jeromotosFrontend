<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Create Tipo Moto</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input
        color="black"
        v-model.trim="dato.referencia"
        class="text-uppercase"
        autofocus
        stack-label
        label="Referencia"
        maxlength="20"
      />
      <q-select color="black" label="MARCA" v-model="selectMarca" :options="listaMarcas" style="padding: 0" />
    </q-card-section>
    
    <q-card-actions align="right" class="text-black">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Aceptar" :disable="disabledButton"  @click="createTipo" />
    </q-card-actions>

	</q-card>
</template>

<script>
  import http from "../../../functions/http";
  import disabled from "../../../functions/disabled";
	import mapping from "../../../functions/mapping";

  export default {
    props: ["dato"],
    data() {
      return {
				selectMarca:{ value:0, label:''},
				listaMarcas:[],
				listaServiciosTaller:[]
			};
		},
		beforeMount() {
			this.$nextTick(() => {
				this.cargarMarcas()
				this.cargarServiciosTaller()
			});
		},
    computed: {
      disabledButton: function() {
				return disabled.tipoMoto(this.dato, this.selectMarca);
			}
    },
    methods: {
      createTipo() {
        var ruta = "tipoMoto/create";
				var datos = {
          id: 0,
          referencia: this.dato.referencia.toUpperCase(),
          marcaId: this.selectMarca.value,
          adminId: 1,
        };
				http(
          ruta,
          datos,
          response => {
            if (!response.data.error) {
              this.createTabla(response.data.datos.id);
							this.$emit("click", false, response.data.datos.referencia);
							
            } else {
              this.$emit("click", true, response.data.mensaje);
            }
          },
          e => {
            this.$emit("click", true, e.message);
          }
        );
			},
			createTabla(tipo_motoId){
				var ruta = 'tablamantenimiento/create'
				var datos = {lista:mapping.tablaInit(this.listaServiciosTaller, tipo_motoId)}
				http(ruta, datos, response => {
					if(!response.data.error){
            
					}
				}, e=>{

				})
			},
			cargarMarcas() {
        var ruta = "marca/findAllMarcaMaps";
        http(ruta, null,
          response => {
            this.listaMarcas = response.data.datos;
          },
          e => {
            //this.error = e.message;
            //this.dialogError = true;
          }
        );
			},
			cargarServiciosTaller() {
        var ruta = "servicioTaller/findAll";
        http(ruta, null, response => {
            this.listaServiciosTaller = response.data.datos;
          },
          e => {
            //this.error = e.message;
            //this.dialogError = true;
          }
        );
			},
		}
  };
</script>