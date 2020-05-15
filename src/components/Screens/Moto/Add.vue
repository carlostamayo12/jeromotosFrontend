<template>
  <div>
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

      <q-card-section class="q-pt-none row">
        <q-select
          label="MARCA"
          color="black"
          class="col q-mr-md"
          dense
          v-model="selectMarca"
          :options="listaMarcas"
          @input="selectedMarca"
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
      <q-card-actions align="right" class="text-black q-mb-none">
        <q-btn label="Cancel" flat v-close-popup />
        <q-btn
          label="Aceptar"
          flat
          :disable="disabledButton"
          @click="createMoto"
        />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="dialogError">
      <Error :error="error" />
    </q-dialog>
  </div>
</template>

<script>
  import http from "../../../functions/http";
  import disabled from "../../../functions/disabled";
  import mapping from "../../../functions/mapping";
  import listar from "../../../functions/listar";
  import Error from "../Error";

  export default {
    components: { Error },
    props: ["dato"],
    data() {
      return {
        error:'',
        dialogError: false,
        idMoto: 10,
        existTabla: false,
        selectMarca: { value: 0, label: "" },
        listaMarcas: [],
        selectTipo: { value: 0, label: "" },
        listaTipos: [],
        listaPersonas: [],
        persona: {
          id: 0,
          nombre: ""
        },
        listaTablaMantenimiento: [],
        contador: []
      };
    },
    computed: {
      disabledButton: function() {
        return disabled.moto(this.dato, this.selectMarca, this.selectTipo, this.persona);
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
        this.lastId();
        this.cargarMarcas();
        this.cargarTipos();
        this.cargarPersonas();
      });
    },
    methods: {
      lastId() {
        var ruta = "moto/lastId";
        http(
          ruta,
          {},
          response => {
            if (!response.data.error) {
              if (response.data.datos.length > 0) {
                this.idMoto = response.data.datos[0].id + 1;
              } else {
                this.idMoto = 1;
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
      createMoto() {
        var ruta = "tablamantenimiento/findByTipoAll";
        var datos = { tipoMoto: this.selectTipo.value };
        
        http(ruta, datos, response => {
          if(!response.data.error){
            if ((response.data.datos.filter(t => t.tiempo > 0 || t.kilometraje > 0)).length > 0 ){
              var ruta = 'moto/create'
              var lista = mapping.contadorInit(response.data.datos, this.idMoto)
              var moto = {
                id: this.idMoto,
                placa: this.dato.placa.toUpperCase(),
                color: this.dato.color.toUpperCase(),
                tipo_motoId: this.selectTipo.value,
                propietarioId: this.persona.id,
                adminId: 1};
                
                var ruta = 'moto/create'
                var datos = {moto: moto, lista: lista}
                http(ruta, datos, response =>{
                    if(!response.data.error){
                      this.$emit("click", false, response.data.datos.placa);
                    }else{
                       this.$emit("click", true, response.data.mensaje);
                    }
                }, e=> {
                    this.$emit("click", true, e.message);
                })
            }else{
              this.error = 'La tabla de mantenimiento de la motocicleta ' + this.selectTipo.label + ' esta vacia'
              this.dialogError = true
            }
          }else{
            this.error = response.data.mensaje
            this.dialogError = true
          }
        
        }, e =>{
          this.error = e.message
          this.dialogError = true
        })
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
            if (!response.data.error) {
              this.listaMarcas = response.data.datos;
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
      cargarTipos() {
        var ruta = "tipoMoto/findAll";
        http(
          ruta,
          null,
          response => {
            if (!response.data.error) {
              this.listaTipos = response.data.datos.map(item => {
                return {
                  value: item.id,
                  label: item.referencia,
                  marcaId: item.marcaId
                };
              });
            } else {
              this.error = response.data.mensaje;
              this.dialogError = true;
            }
          },
          e => {
            this.error = response.data.mensaje;
            this.dialogError = true;
          }
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
      selectedMarca(){
        this.selectTipo = {value: 0, label: ''}
      }
    }
  };
</script>