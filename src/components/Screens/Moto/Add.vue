<template>
  <q-card style="min-width: 450px; min-height: 350px">
    <q-card-section>
      <div class="text-h6">Create Moto</div>
    </q-card-section>
    
		<q-card-section class="q-pt-none row">
      <q-input
        color="black"
        v-model.trim="dato.placa"
        class="text-uppercase col q-mr-md"
        autofocus
        mask="AAA##A"
        stack-label
        label="Placa"
        dense
        maxlength="6"
      />
      <q-input
        color="black"
        v-model="dato.color"
        class="text-uppercase col q-mx-md"
        stack-label
        dense
        label="Color"
      />
    </q-card-section>
    
		<q-card-section class="q-pt-none row ">
      <q-select
        label="MARCA"
        color="black"
        class="col q-mr-md"
				dense
        v-model="selectMarca"
        :options="listaMarcas"
        style="padding: 0"
      />
      <q-select 
			label="REFERENCIA" 
			color="black" 
			class="col q-mx-md"
			dense 
			v-model="selectTipo" 
			:options="listarTipos"
			/>
    </q-card-section>
    
		<q-card-section class="q-pt-none">
      <q-input
        dense
        v-model.trim="persona.nombre"
        color="black"
        class="text-uppercase"
        stack-label
        label="Propietario"
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
    <pre>{{contador}}</pre>
		<q-card-actions align="right" class="text-black q-mb-none">
      <q-btn label="Cancel" color="red" v-close-popup />
      <q-btn label="Aceptar" color="red" icon-right="send" :disable="disabledButton" @click="createMoto" />
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
        selectMarca: { value: 0, label: "" },
        listaMarcas: [],
        selectTipo: { value: 0, label: "" },
        listaTipos: [],
        listaPersonas: [],
        persona: {
          id: 0,
          nombre: ""
        },
        listaTablaMantenimiento:[],
        contador:[]
      };
    },
    computed: {
      disabledButton: function() {
        return disabled.moto(this.dato);
      },
      listarTipos: function() {
        if (this.selectMarca.value == 0) {
          return [];
        }
        var lista = this.listaMarcas.filter(
          t => t.value == this.selectMarca.value
        );
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
      }
    },
    beforeMount() {
      this.$nextTick(() => {
        this.cargarMarcas();
        this.cargarTipos();
        this.cargarPersonas();
      });
    },
    methods: {
      createMoto() {
        var self = this
        var ruta = 'moto/create';
        var datos = {
          id: 0,
          placa: this.dato.placa.toUpperCase(),
					color: this.dato.color.toUpperCase(),
					tipo_motoId:this.selectTipo.value,
					propietarioId: this.persona.id,
					adminId: 1
				};
				http(ruta, datos, response => {
            if (!response.data.error) {
              self.cargarTablaMantenimiento(response.data.datos.id,  response.data.datos.tipo_motoId)
              this.$emit("click", 0, response.data.datos.placa);
            } else {
              this.$emit("click", 1, response.data.mensaje);
            }
          },
          e => {
            this.$emit("click", 2, e.message);
          }
        )
      },
      propietario(persona) {
        this.persona = JSON.parse(JSON.stringify(persona));
      },
      cargarMarcas() {
        var ruta = "marca/findAllMarcaTipoMaps";
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
        var ruta = "tipoMoto/findAll";
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
          },
          e => {}
        );
      },
      cargarPersonas() {
        var ruta = "persona/findAll";
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
      },
      cargarTablaMantenimiento(motoId, tipoMotoId){
        var ruta = "tablamantenimiento/findByTipoAll"
				var datos = {tipoMoto: tipoMotoId}
        
        http(ruta, datos, response => {
            var datos = { lista: mapping.tablaContador(response.data.datos, motoId)}
            var ruta = "contador/create"
            //var datos = {lista: this.contador}
            http(ruta, datos, response => {
              if(response.data.error){

              }
            }, e =>{

            })
        }, e => {
					console.log(e.message)
				})
			}
    }
  };
</script>